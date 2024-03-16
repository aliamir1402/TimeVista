import React from "react";
import medium from "../components/images/medium.svg";
import instagram from "../components/images/instagram.svg";
import reddit from "../components/images/reddit.svg";
import X from "../components/images/twitterx.svg";
import youtube from "../components/images/youtube.svg";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-4xl">
            Time
            <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Vista{""}
            </span>
          </p>
          <p className="mx-56 my-4 mb-0">
            2024© TimeVista LLC | All Rights Reserved | support@timevista.com |
            TimeVista Ecosystem Islamabad, Pakistan
          </p>
        </div>

        <div className="flex_box items-center justify-center text-center mt-8 mb-4 px-20">
          <div className="flex_item feature-item">
            <a href="">Home</a>
          </div>
          <div className="flex_item feature-item">
            <a href="">Products</a>
          </div>
          <div className="flex_item feature-item">
            <a href="">About</a>
          </div>
          <div className="flex_item feature-item">
            <a href="">Articles</a>
          </div>
          <div className="flex_item feature-item">
            <a href="">Contact Us</a>
          </div>
          <div className="flex_item feature-item">
            <a href="">FAQs</a>
          </div>
        </div>
        <div className="bor flex_box items-center justify-center text-center mt-4 mb-4">
          <div className="p-1 ml-8 mr-8">
            <img src={X} alt="" height={32} width={32} />
          </div>
          <div className="p-1 ml-8 mr-8">
            <img src={youtube} alt="" height={32} width={32} />
          </div>
          <div className="p-1 ml-8 mr-8">
            <img src={instagram} alt="" height={32} width={32} />
          </div>
          <div className="p-1 ml-8 mr-8">
            <img src={reddit} alt="" height={32} width={32} />
          </div>
          <div className="p-1 ml-8 mr-8">
            <img src={medium} alt="" height={32} width={32} />
          </div>
        </div>
      </div>
    </>
  );
}
