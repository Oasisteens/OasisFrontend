"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import numeral from "numeral";
import "../../app/src/likeBtn.css";
import { useTranslation } from "react-i18next";

const likeButton = ({
  likeloads,
  like,
  postId,
  likestatus,
  likestatuses,
  username,
  setLikestatuses,
  setLikestatus,
  setLikes,
  setLike,
  size,
  category,
  fontsize,
  shift,
  height,
  vershift,
  type,
}) => {
  const [likeload, setLikeLoad] = useState(false);
  const { t } = useTranslation();
  const sendLike = async (category, e) => {
    e.preventDefault();
    if (!username) {
      alert(t("Please sign in to like posts"));
      return;
    }
    try {
      setLikeLoad(true);
      var currentStatus;
      if (type === "individual") {
        currentStatus = likestatus?.status ?? false;
      } else if (type === "all") {
        const likestatusTemp = likestatuses?.find(
          (likestatus) => likestatus.postId === postId,
        );
        currentStatus = likestatusTemp?.status ?? false;
      }
      const res = await axios.post("/api/fetchLike", {
        postId,
        sendUsername: username,
        status: !currentStatus,
        category,
        number: like.number,
      });

      if (type === "individual") {
        setLikestatus(res.data.likestatus);
        setLike(res.data.like);
      } else if (type === "all") {
        const updateStatus = (prevStatuses, newStatus) => {
          return prevStatuses.map((item) =>
            item.postId === newStatus.postId ? newStatus : item,
          );
        }; // only add the newly returned document without pulling info again

        const likestatusNew = res.data.likestatus;
        const likeNew = res.data.like;
        const test = likestatuses.find(
          (likestatus) => likestatus.postId === postId,
        );
        if (test) {
          setLikestatuses((prevStatuses) =>
            updateStatus(prevStatuses, likestatusNew),
          );
        } else {
          setLikestatuses((prevStatuses) => [...prevStatuses, likestatusNew]);
        }
        setLikes((prevLikes) => updateStatus(prevLikes, likeNew));
      }
      setLikeLoad(false);
    } catch (error) {
      setLikeLoad(false);
      console.log(error);
    }
  };
  return (
    <>
      {type === "individual" && like.postId === postId && !likeload && (
        <section style={{ display: "flex", height: height }}>
          <form onSubmit={(e) => sendLike(category, e)} disabled={likeload}>
            <button className="likeBtn" type="submit">
              {likestatus && likestatus.status ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  width={size}
                  height={size}
                  className="heart"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={size}
                  className="heart"
                  height={size}
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={20}
                  />
                </svg>
              )}
            </button>
          </form>
          <p
            className="postlike"
            style={{ fontSize: fontsize, left: shift, top: vershift }}
          >
            {like.number > 1000
              ? numeral(like.number).format("0.0a")
              : like.number}
          </p>
        </section>
      )}

      {type === "individual" && like.postId === postId && likeload && (
        <section className="likeLoad" style={{ height: height }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            width={size}
            height={size}
            className="loadHeart"
            viewBox="0 0 512 512"
          >
            <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
          </svg>
        </section>
      )}

      {type === "all" && like.postId === postId && !(likeloads || likeload) && (
        <section style={{ display: "flex", height: height }}>
          <form
            onSubmit={(e) => sendLike(category, e)}
            disabled={likeloads || likeload || !username}
          >
            <button className="likeBtn" type="submit">
              {(() => {
                const likestatus = likestatuses?.find(
                  (likestatus) =>
                    likestatus.postId === postId &&
                    likestatus.username === username,
                );
                return likestatus && likestatus.status ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    width={size}
                    height={size}
                    className="heart"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    className="heart"
                    height={size}
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                      fill="none"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={20}
                    />
                  </svg>
                );
              })()}
            </button>
          </form>
          <p
            className="postlike"
            style={{ fontSize: fontsize, left: shift, top: vershift }}
          >
            {like.number > 1000
              ? numeral(like.number).format("0.0a")
              : like.number}
          </p>
        </section>
      )}

      {type === "all" && like.postId === postId && (likeloads || likeload) && (
        <section className="likeLoad" style={{ height: height }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            width={size}
            height={size}
            className="loadHeart"
            viewBox="0 0 512 512"
          >
            <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
          </svg>
        </section>
      )}
    </>
  );
};

export default likeButton;
