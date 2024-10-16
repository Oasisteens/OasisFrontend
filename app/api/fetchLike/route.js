"use server";
import Like from "../../../models/like";
import Likestatus from "../../../models/likestatus";
import DBconnect from "../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const forum = req.nextUrl.searchParams.get("forum");
    const username = req.nextUrl.searchParams.get("username");
    if (forum) {
      if (!username) {
        const likes = await Like.find({ forum });
        return NextResponse.json({ likes }, { status: 200 });
      }
      const [likes, likestatuses] = await Promise.all([
        Like.find({ forum }),
        Likestatus.find({ username }),
      ]);
      return NextResponse.json({ likes, likestatuses }, { status: 200 });
    } else {
      if (!username) {
        return NextResponse.json({ status: 200 });
      }
      const likestatuses = await Likestatus.find({ username });
      return NextResponse.json({ likestatuses }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST method updates like and likestatus with OCC, and then returns the updated version
export async function POST(req) {
  await DBconnect();
  const { postId, sendUsername, status, category, number } = await req.json();

  const like = await Like.findOne({ postId });
  if (!like || like.number !== number || (number === 0 && status === false)) {
    return NextResponse.json(
      { message: "busy sending request" },
      { status: 400 },
    );
  }

  status ? like.number++ : like.number--;

  const likestatus = await Likestatus.findOneAndUpdate(
    { postId, username: sendUsername, category },
    { $set: { status } },
    { upsert: true, new: true },
  );

  await like
    .save()
    .then(() => {})
    .catch(() => {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    });
  return NextResponse.json(
    { message: "like successfully recorded", likestatus, like },
    { status: 201 },
  );
}
