import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comment.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useLocation } from "react-router-dom";

export default function Comment(props) {
  // console.log("props -----> ",props)
  const location=useLocation();
  console.log("location.state ---> ",location.state)
  console.log("location.state.postId ---> ",location.state.postId)
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function check() {
      await axios
        .get("http://localhost:5000/api/user/displayComment?postId="+location.state.postId, {
          responseType: "json",
        })
        .then((response) => {
          setPost(response.data.Details);
          console.log("response   ->", response.data);
          console.log("post --> ", post);
        })
        .catch(function (error) {
          if (error) console.log("error  ----> ", error);
        });
    }
    check();
  }, []);
  if (post.length===0) return "no comments";
  return (
    <div class="comment-thread">
      {post.map((posts) => (
        <details open class="comment" id="comment-1">
          {console.log("posts -----> ", posts)}
          <a href="#comment-1" class="comment-border-link">
            <span class="sr-only">Jump to comment-1</span>
          </a>
          <summary>
            <div class="comment-heading">
              <div class="comment-voting">
                <ArrowUpwardIcon className="upvote" />
                <span>{posts.like - posts.dislike}</span>
                <ArrowDownwardIcon className="downvote" />
              </div>
              <div class="comment-info">
                <a href="#" class="comment-author">
                  u/{posts.user[0].username}
                </a>
                <p class="m-0">{posts.createdAt}</p>
              </div>
            </div>
          </summary>
          <div class="comment-body">
            <p>{posts.body}</p>
            <button
              type="button"
              data-toggle="reply-form"
              data-target="comment-1-reply-form"
            >
              Reply
            </button>
            <button type="button">Flag</button>

            <form
              method="POST"
              class="reply-form d-none"
              id="comment-1-reply-form"
            >
              <textarea placeholder="Reply to comment" rows="4"></textarea>
              <button type="submit">Submit</button>
              <button
                type="button"
                data-toggle="reply-form"
                data-target="comment-1-reply-form"
              >
                Cancel
              </button>
            </form>
          </div>

          <div class="replies">
            {posts.reply.map((replies) => {
              return (
                <details open class="comment" id="comment-2">
                  <a href="#comment-2" class="comment-border-link">
                    <span class="sr-only">Jump to comment-2</span>
                  </a>

                  <summary>
                    <div class="comment-heading">
                    <div class="comment-voting">
                      <ArrowUpwardIcon className="upvote" />
                      {console.log("replies --->",replies)}
                      <span>{replies.like - replies.dislike}</span>
                      <ArrowDownwardIcon className="downvote" />
                    </div>
                      <div class="comment-info">
                        <a href="#" class="comment-author">
                          u/{replies.user[0].username}
                        </a>
                        <p class="m-0">{replies.createdAt}</p>
                      </div>
                    </div>
                  </summary>

                  <div class="comment-body">
                    <p>{replies.body}</p>
                    <button
                      type="button"
                      data-toggle="reply-form"
                      data-target="comment-2-reply-form"
                    >
                      Reply
                    </button>
                    <button type="button">Flag</button>

                    <form
                      method="POST"
                      class="reply-form d-none"
                      id="comment-2-reply-form"
                    >
                      <textarea
                        placeholder="Reply to comment"
                        rows="4"
                      ></textarea>
                      <button type="submit">Submit</button>
                      <button
                        type="button"
                        data-toggle="reply-form"
                        data-target="comment-2-reply-form"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </details>
              );
            })}

            <a href="#load-more">Load more replies</a>
          </div>
        </details>
      ))}
    </div>
    // <div className="posts-wrapper">
    //   {post.map((posts) => (
    //     <div className="post">
    //       {console.log("post body----> ", posts.body)}
    //       <div className="post-sidebar">
    //         <ArrowUpwardIcon className="upvote" />
    //         <span>{posts.like - posts.dislike}</span>
    //         <ArrowDownwardIcon className="downvote" />
    //       </div>
    //       <div className="post-title">
    //         <img src={posts.user.image} />
    //         <span className="post-user">Posted by</span>
    //         <span className="post-user underline">
    //           u/{posts.user[0].username}
    //         </span>
    //         <div className="spacer"></div>
    //         <Button label="+ JOIN" />
    //       </div>
    //       <div className="post-body">
    //         <span className="title">{posts.body}</span>
    //         <div className="post-footer">
    //           <div className="comments footer-action">
    //             <ChatBubbleOutlineOutlinedIcon className="comment-icon" />
    //             <span>Reply</span>
    //           </div>
    //           <div className="share footer-action">
    //             <ShareIcon />
    //             <span>Share</span>
    //           </div>
    //           <div className="save footer-action">
    //             <BookmarkBorderIcon />
    //             <span>Save</span>
    //           </div>
    //           <MoreHorizIcon className="more-icon footer-action" />
    //         </div>
    //         {posts.reply.map((replies) => {
    //           return (
    //             <div>
    //               <div className="post-title">
    //                 <img src={posts.user.image} />
    //                 <span className="post-user">Posted by</span>
    //                 <span className="post-user underline">
    //                   u/{posts.user[0].username}
    //                 </span>
    //                 <div className="spacer"></div>
    //                 <Button label="+ JOIN" />
    //                 </div>
    //                 <div>
    //                   <p>{replies.body}</p>
    //                   <div className="post-footer">
    //                     <div className="comments footer-action">
    //                       <ChatBubbleOutlineOutlinedIcon className="comment-icon" />
    //                       <span>Reply</span>
    //                     </div>
    //                     <div className="share footer-action">
    //                       <ShareIcon />
    //                       <span>Share</span>
    //                     </div>
    //                     <div className="save footer-action">
    //                       <BookmarkBorderIcon />
    //                       <span>Save</span>
    //                     </div>
    //                     <MoreHorizIcon className="more-icon footer-action" />
    //                   </div>
    //                 </div>
    //               </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   ))}
    // </div>

    // <div>
    //     {post.map((posts) => {
    //         {console.log("post body----> ",posts.body)}
    //         return <div className="mainComment">
    //             <p>{posts.body}</p>
    //             {posts.reply.map((commentReply)=>{
    //                 {console.log("commentReply.body----> ",commentReply.body)}
    //                 return <p className="comment-reply">{commentReply.body}</p>
    //             })}
    //         </div>
    //     })}
    // </div>
  );
}
