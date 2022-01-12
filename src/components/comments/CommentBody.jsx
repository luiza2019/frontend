import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup, Button, Card } from "react-bootstrap";
import { timeSince } from "../../helpers/calcTimeLeft";
import { commentsContext } from "../../contexts/CommentsContext";
const CommentBody = ({ item, admin }) => {
  const {
    addComments,
    getCommentsForRoom,
    commentToEdit,
    getCommentToEdit,
    saveEditedComment,
    deleteComment,
    comments,
  } = useContext(commentsContext);
  const [comment, setComment] = useState("");
  function handleChange(e) {
    setComment(e.target.value);
  }
  function handleDelete(com) {
    deleteComment(com);
  }
  useEffect(() => {
    getCommentsForRoom(user.id);
  }, []);

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  let commenting;
  const [bool, setBool] = useState(false);
  const [editComm, setEditComm] = useState("");
  function handleChangeEdit(e) {
    setEditComm(e.target.value);
  }
  function saveComment(item) {
    let ed = { ...item, text: editComm };

    saveEditedComment(ed, item.id);
    setBool(false);
  }

  commenting = (
    <>
      <InputGroup className="mb-3 createComment">
        <FormControl
          rows={2}
          as="textarea"
          placeholder="Leave a comment"
          maxLength="140"
          onChange={handleChangeEdit}
          value={editComm}
        />
      </InputGroup>
      <Button
        style={{ backgroundColor: "#324873" }}
        onClick={() => saveComment(item)}
      >
        Save
      </Button>
    </>
  );
  function handleEdit(item) {
    setBool(true);
    getCommentToEdit(item.id);
  }
  return (
    <Card className="mt-2">
      <Card.Header>
        <span style={{ fontWeight: "bold", color: "#979797" }}>
          {item.owner}
        </span>{" "}
        <span>
          {" "}
          {item.createdAt.slice(0, 10)}, {timeSince(item.createdAtMs)} Back{" "}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Title>{bool ? commenting : item.text}</Card.Title>
        {user.email === item.owner ? (
          <>
            <small
              onClick={() => handleDelete(item)}
              style={{ color: "red", cursor: "pointer" }}
            >
              Delete
            </small>
            <small
              onClick={() => {
                handleEdit(item);
                setEditComm(item.text);
              }}
              style={{
                marginLeft: "5px",
                color: "darkgreen",
                cursor: "pointer",
              }}
            >
              Edit
            </small>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentBody;
