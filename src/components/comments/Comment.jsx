import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { commentsContext } from "../../contexts/CommentsContext";
import CommentBody from "./CommentBody";
const Comment = () => {
  const { addComments, getCommentsForRoom, saveEditedComment, comments } =
    useContext(commentsContext);
  const [comment, setComment] = useState("");
  function handleChange(e) {
    setComment(e.target.value);
  }
  const params = useParams();
  useEffect(() => {
    getCommentsForRoom(params.id);
  }, []);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  function creatingComment(e) {
    e.preventDefault();
    // let time = new Date();
    // let timeMls = Date.now();
    // let tempUserName;
    // if (user.currentUser) {
    //     tempUserName = user.currentUser.displayName;
    // } else {
    //     tempUserName = user.username;
    // }
    addComments(comment, user.id, params.id, user.email);
    setComment("");
  }
  const [bool, setBool] = useState(false);
  const [editComm, setEditComm] = useState("");

  return (
    <>
      {user ? (
        <>
          <h4 style={{ marginTop: "10px" }}>
            Комментарии ({comments ? comments.length : <h2>Loading</h2>})
          </h4>
          <div className="mt-4 container">
            <InputGroup className="mb-3 createComment">
              <FormControl
                rows={2}
                as="textarea"
                placeholder="Оставьте отзыв о товаре"
                maxLength="140"
                onChange={handleChange}
                value={comment}
              />
              <Button
                style={{ backgroundColor: "#31B8BF", border: "none" }}
                onClick={creatingComment}
              >
                Отправить
              </Button>
            </InputGroup>
          </div>
        </>
      ) : (
        <>
          <h4>
            Чтобы оставить комментарий под продуктом, вам нужно{" "}
            <Link to="/login">авторизоваться</Link>
          </h4>
        </>
      )}

      <div className="mt-4 container bg-light">
        {comments ? (
          comments
            .sort((a, b) => b.createdAtMs - a.createdAtMs)
            .map((item) => <CommentBody key={item.id} item={item} />)
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
};

export default Comment;
