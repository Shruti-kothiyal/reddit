import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Comment() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function check() {
      await axios
        .get(
          "http://localhost:5000/api/user/displayComment",
          {
            responseType: "json",
          }
        )
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
  if (!post) return null;
  return (
    <div>
        {post.map((posts) => {
            {console.log("post body----> ",posts.body)}
            return <div>
                <p>{posts.body}</p>
                {posts.reply.map((commentReply)=>{
                    {console.log("commentReply.body----> ",commentReply.body)}
                    return <p>{commentReply.body}</p>
                })}
            </div>
        })}
    </div>
  );
}
