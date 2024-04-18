import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import BlogImg from "../components/images/blog.png";
import RightArrow from "../components/images/icons8-right-button-96.png";

export default function Articles() {
  const [button1, setButton1] = useState(0);
  const [button2, setButton2] = useState(1);
  const [button3, setButton3] = useState(0);
  const [button4, setButton4] = useState(0);
  const [button5, setButton5] = useState(0);
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="blog-title">Blog</div>
      <div className="flex justify-center blog-bar">
        <div
          className={
            button1
              ? `selected-blog-bar-item `
              : `blog-bar-item ` + `flex justify-center flex_item`
          }
        >
          All
        </div>
        <div
          className={
            button2
              ? `selected-blog-bar-item`
              : `blog-bar-item ` + `flex justify-center flex_item`
          }
        >
          Product Updates
        </div>
        <div
          className={
            button3
              ? `selected-blog-bar-item`
              : `blog-bar-item ` + `flex justify-center flex_item`
          }
        >
          News
        </div>
        <div
          className={
            button4
              ? `selected-blog-bar-item`
              : `blog-bar-item ` + `flex justify-center flex_item`
          }
        >
          Academy
        </div>
        <div
          className={
            button5
              ? `selected-blog-bar-item`
              : `blog-bar-item ` + `flex justify-center flex_item`
          }
        >
          Features
        </div>
      </div>

      <div className="main-blog flex">
        <div className="flex_item blog-sub-section-1 justify-center items-center">
          <div className="blog-title-main mt-4 mb-4">
            5 advantages of golf scheduling software
          </div>
          <div className="blog-description-main mt-4 mb-4">
            Description - 5 advantages of golf scheduling software
          </div>
          <button className="mt-4 mb-4">
            <div className="flex justify-left items-center">
              <div className="mr-2">
                <img src={RightArrow} alt="" height={30} width={30} />
              </div>
              <div className="">Read full article</div>
            </div>
          </button>
        </div>
        <div className="flex_item blog-sub-section-2">
          <img
            src={BlogImg}
            alt="mainImg"
            width="100%"
            style={{
              borderRadius: "0px 70px 70px 0px",
            }}
          />
        </div>
      </div>

      <div className="flex_box m-12">
        <div
          className="flex_item ml-2 mr-2"
          style={{ border: "1px solid black" }}
        >
          <div
            style={{
              borderRadius: "15px 15px 0px 0px",
              boxShadow: "0px 0px 10px 0px #e9e9e9",
            }}
          >
            <img
              src={BlogImg}
              alt=""
              width="35%"
              height="35%"
              style={{ borderRadius: "15px 15px 0px 0px" }}
            />
          </div>
          <div className="flex mt-4">
            <div className="flex justify-left items-center blog-item-1">
              Features
            </div>
            <div className="flex justify-end items-center ml-2 blog-item-2">
              Nov 9, 2021
            </div>
          </div>
          <div className="title-item-blog">Blog Title</div>
          <div className="flex justify-left item-center">
            <div className="flex justify-center items-center">
              <img
                src={RightArrow}
                alt="author"
                height={40}
                width={40}
                style={{
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="flex justify-center items-center">Author Name</div>
          </div>
        </div>

        
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </>
  );
}
