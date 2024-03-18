"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import search from "../../components/js/searchPost.js";
import "../../app/i18n.js";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import "../../app/src/search.css";
import Image from "next/image";

const SearchForm = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language.substring(0, 2); // get language from i18n
  // Pull info(language) from localStorage

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]); //localstorage get language setting

  useEffect(() => {
    if (!localStorage.getItem("dashColor")) {
      localStorage.setItem("dashColor", "blue");
    }
    const selectedColor = localStorage.getItem("dashColor");
    if (selectedColor !== "blue") {
      document.documentElement.style.setProperty(
        "--main-color",
        `var(--${selectedColor})`,
      );
      document.documentElement.style.setProperty(
        "--sub-color",
        `var(--${selectedColor}-light)`,
      );
      document.documentElement.style.setProperty(
        "--sec-color",
        `var(--${selectedColor}-lightest)`,
      );
    } else {
      document.documentElement.style.setProperty(
        "--main-color",
        `var(--blue-lighter)`,
      );
      document.documentElement.style.setProperty(
        "--sub-color",
        `var(--blue-light)`,
      );
      document.documentElement.style.setProperty(
        "--sec-color",
        `var(--blue-lightest)`,
      );
    }
  }, []); //localstorage get color setting

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    // save user option in localStorage
    localStorage.setItem("language", selectedLanguage);
  };

  const changeColor = (event) => {
    const selectedColor = event.target.value;
    if (selectedColor) {
      setColor(selectedColor);
      document.documentElement.style.setProperty(
        "--dash-color",
        `var(--${selectedColor})`,
      );
      document.documentElement.style.setProperty(
        "--scroll-color",
        `var(--${selectedColor}-lighter)`,
      );
      localStorage.setItem("dashColor", selectedColor);
    }
  };

  const getPosts = async () => {
    const res = await axios.get("/api/general");
    setPosts(res.data.posts);
  };

  useEffect(() => {
    getPosts();
  }, []); //fetch posts

  const handleSearch = (event) => {
    event.preventDefault();
    const pattern = event.target[0].value;
    setSearchResults(search(posts, pattern));
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div>
      <div className="searchTop">
        <Link href="intro" className="stoIntro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            width={70}
            height={70}
            viewBox="0 0 512 512"
          >
            <path
              d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z"
              fill="none"
              stroke="wheat"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11"
              fill="none"
              stroke="wheat"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
          </svg>
          <span className="intro">{t("Oasis")}</span>
        </Link>
        <form onSubmit={handleSearch} className="searchForm">
          <input type="text" placeholder="Search" id="searchInput" />
          <button type="submit" id="submitBtn">
            <Image
              src="./search.svg"
              width={30}
              height={30}
              style={{ position: "relative", margin: "0 auto" }}
            />
          </button>
        </form>
      </div>
      {searchResults.length > 0 && (
        <div>
          <h2>Results</h2>
          {searchResults.map((t) => (
            <div key={t.item._id}>
              <h3>{t.item.title}</h3>
              <p>{t.item.username}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;