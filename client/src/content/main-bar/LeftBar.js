import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeftBar.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

export default function LeftBar() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const page = 0;
  const sort_flag = 789;
  useEffect(() => {
    async function check() {
      await axios
        .get(
          "http://localhost:5000/api/user/getAllRandomPostInSubreddit?page=" +
            page +
            "&" +
            sort_flag,
          {
            responseType: "json",
          }
        )
        .then((response) => {
          setPost(response.data.Details);
          console.log("response   ->", response.data.Details);
          console.log("setdata --> ", post);
        })
        .catch(function (error) {
          if (error) console.log("error  ----> ", error);
        });
    }
    check();
  }, []);
  if (!post) return null;
  return (
    <div className="main-bar">
      <div className="filter-container">
        <div className="filter-element hoverable">
          <WhatshotOutlinedIcon />
          <span>Hot</span>
        </div>
        <div className="filter-element hoverable">
          <span>Everywhere</span>
          <ArrowDropDownIcon />
        </div>
        <div className="filter-element-secondary hoverable">
          <NewReleasesOutlinedIcon />
          <span>New</span>
        </div>
        <div className="filter-element-secondary hoverable">
          <TrendingUpIcon />
          <span>Top</span>
        </div>
        <MoreHorizIcon className="filter-element-tertiary hoverable" />
        <div className="spacer"></div>
        <div className="filter-element-menu hoverable">
          <MenuIcon />
          <ArrowDropDownIcon />
        </div>
      </div>

      <div className="posts-wrapper">
        {post.map((posts) => (
          <div className="post">
            <div className="post-sidebar">
              <ArrowUpwardIcon className="upvote" />
              <span>{posts.upvotes - posts.downvotes}</span>
              <ArrowDownwardIcon className="downvote" />
            </div>
            <div className="post-title">
              <img src={posts.postimg} />
              <span className="post-user">Posted by</span>
              <span className="post-user underline">
                u/{posts.user_post.username}
              </span>
              <div className="spacer"></div>
              <Button label="+ JOIN" />
            </div>
            <div className="post-body">
              <span className="title">{posts.caption}</span>
              {posts.post.map((imgData) => {
                return <img className="post-body-img" src={imgData} />;
              })}
              {posts.body && <span className="description">{posts.body}</span>}
            </div>
            <div className="post-footer">
              <div className="comments footer-action">
                <Link
                  onClick={() => {
                    navigate("/comment", { state: { postId: posts._id } });
                  }}
                >
                  <ModeCommentOutlinedIcon className="comment-icon" />
                  <span>Comments</span>
                </Link>
              </div>
              <div className="share footer-action">
                <ShareIcon />
                <span>Share</span>
              </div>
              <div className="save footer-action">
                <BookmarkBorderIcon />
                <span>Save</span>
              </div>
              <MoreHorizIcon className="more-icon footer-action" />
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className="left-bar">
    //     {post.map((data)=>{
    //         {console.log("data ----> ",data)}
    //         return <div>
    //             <p>{data.user_post.username}</p>
    //             <p>{data.createdAt}</p>
    //             <p>{data.caption}</p>
    //             <p>{data.body}</p>
    //             {data.post.map((imgData)=>{
    //                 return <p><img src={imgData}/></p>
    //             })}
    //             <p></p>
    //         </div>
    //     })}
    // </div>
  );
}
