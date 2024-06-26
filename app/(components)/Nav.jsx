"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../src/nav.css";
import "../i18n";
import { useTranslation } from "react-i18next";

const Nav = ({ username }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [lift, setLift] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="dash">
      <div className="navContainer">
        <div className="navDblock">
          <Link href={`/profile/${username}`} className="iconProfile icon">
            <Image
              src="/person-circle-outline.svg"
              width="60"
              height="60"
              alt="person"
            />
          </Link>
        </div>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-2");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/general"
          className="navDblock"
        >
          <div
            className={`icon icon-2 ${activeIcon === "icon-2" && lift ? "lift" : ""}`}
          >
            <Image
              src="/earth-outline.svg"
              width="40"
              height="40"
              alt="earth"
            />
          </div>
          <li className="nav">
            <p className="channel">{t("General")}</p>
          </li>
        </Link>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-3");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/news"
          className="navDblock"
        >
          <div
            className={`icon icon-3 ${activeIcon === "icon-3" && lift ? "lift" : ""}`}
          >
            <Image
              src="/chatbox-outline.svg"
              width="40"
              height="40"
              alt="chatbox"
            />
          </div>
          <li className="nav">
            <p className="channel">{t("News")}</p>
          </li>
        </Link>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-4");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/confession"
          className="navDblock"
        >
          <div
            className={`icon icon-4 ${activeIcon === "icon-4" && lift ? "lift" : ""}`}
          >
            <Image src="/heart.svg" width="40" height="40" alt="heart" />
          </div>
          <li className="nav">
            <p className="channel">{t("Confession")}</p>
          </li>
        </Link>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-5");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/discussion"
          className="navDblock"
        >
          <div
            className={`icon icon-5 ${activeIcon === "icon-5" && lift ? "lift" : ""}`}
          >
            <Image src="/book-outline.svg" width="40" height="40" alt="book" />
          </div>
          <li className="nav">
            <p className="channel">{t("Discussion")}</p>
          </li>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
