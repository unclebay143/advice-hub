import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../redux/advice/service/root-endpoints";
import { timeAgo } from "../../_helper/time/time";
import "./comment.css";

const AdviceComment = (props) => {
  const { adviceId } = props;
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch comment
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await axios.post(
          BASE_URL + "/comments/retrieve_comment",
          { adviceId }
        );
        setComments(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    //
    if (adviceId) {
      fetchComment();
    }
  }, [adviceId]);

  //
  if (loading) {
    return <p className="no-comment">Fetching comments. 🔍</p>;
  }

  //
  if (comments.length === 0) {
    return <p className="no-comment">No comment yet</p>;
  }

  return (
    <React.Fragment>
      {comments
        ?.sort((a, b) => b.__createdtime__ - a.__createdtime__)
        .map(
          ({
            commentAuthor,
            commentAuthor_image,
            commentText,
            commentId,
            __createdtime__,
          }) => {
            return (
              <div className="comment-card" key={commentId}>
                {/* commenter information */}
                <div className="comment-author--img">
                  <Link
                    to={{
                      pathname: `/profile/${commentAuthor}`,
                    }}
                  >
                    <img
                      src={`${JSON.parse(commentAuthor_image)}`}
                      alt={`${commentAuthor}`}
                    />
                  </Link>
                </div>

                {/* comment details */}
                <div className="comment-text-wrapper">
                  <p className="comment-text">{commentText}</p>
                  <p className="comment-date">
                    {timeAgo(__createdtime__)} By {commentAuthor}
                  </p>
                </div>
              </div>
            );
          }
        )}
    </React.Fragment>
  );
};

export default AdviceComment;
