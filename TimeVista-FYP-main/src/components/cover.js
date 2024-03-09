import React from "react";
import medium from "../components/images/medium.svg";
import instagram from "../components/images/instagram.svg";
import reddit from "../components/images/reddit.svg";
import X from "../components/images/twitterx.svg";
import youtube from "../components/images/youtube.svg";
import { Link } from "react-router-dom";

export default function cover(props) {
  return (
    <>
      <div className="mt-4 flex_box bor">
        <div className="pt-12 sec-1 bor flex_item">
          <div className="flex_box">
            <div className="p-1">
              <img src={X} alt="" height={32} width={32} />
            </div>
            <div className="p-1">
              <img src={youtube} alt="" height={32} width={32} />
            </div>
            <div className="p-1">
              <img src={instagram} alt="" height={32} width={32} />
            </div>
            <div className="p-1">
              <img src={reddit} alt="" height={32} width={32} />
            </div>
            <div className="p-1">
              <img src={medium} alt="" height={32} width={32} />
            </div>
          </div>
          <div>
            <p className="body-title mt-6">
              Exploring Earth in <br />
              Ways Of{" "}
              <span className="sp-text">
                <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Data
                </span>
              </span>
            </p>
          </div>
          <div className="pt-4 pb-4 des-text bor">
            TimeVista is a groundbreaking project that encapsulates over four
            decades of historical climate data, spanning 1980 to 2022, with a
            singular focus: Revolutionizing Pakistan's agricultural landscape.
          </div>
          <div className="in-line">
            <Link to="/dashboard">
              <button
                type="button"
                class="text-white bg-gradient-to-br from-green-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
              >
                Explore Earth
              </button>
            </Link>
            <button
              type="button"
              class="learn-more-button inline-block rounded-full der-2 der-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:der-primary-accent-100 hover:bg-neutral-100 hover:bg-opacity-10 focus:der-primary-accent-100 focus:outline-none focus:ring-0 active:der-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Learn more
            </button>
          </div>
        </div>
        <div className="p-4 container flex_item bor">
          <img className="centered-image" src={props.Earth} alt="graphics" />
        </div>
      </div>
    </>
  );
}
