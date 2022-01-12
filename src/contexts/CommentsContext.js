import React, { useEffect, useReducer, useState } from "react";
// import { APIcomments } from "../const/config";
import axios from "axios";
import $axios from "../axios";

export const commentsContext = React.createContext();
const INIT_STATE = {
  comments: [],
  commentToEdit: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COMMENTS_FOR_ROOM":
      return { ...state, comments: action.payload };
    case "GET_COMMENTS_TO_EDIT":
      return { ...state, commentToEdit: action.payload };
    default:
      return state;
  }
};

const CommentContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! CREATE

  const addComments = async (text, userId, productId, owner) => {
    try {
      let comment = {
        text,
        userId,
        productId,
        owner,
      };
      const response = await $axios.post("comment/create", comment);
      getCommentsForRoom(productId);
    } catch (e) {
      console.log(e);
    }
  };

  // ! READ

  const getCommentsForRoom = async (productId) => {
    try {
      const { data } = await $axios("/comment/" + productId);
      const newDatas = data.map((item) => {
        item["createdAtMs"] = Date.parse(item.createdAt);
        return item;
      });
      let action = {
        type: "GET_COMMENTS_FOR_ROOM",
        payload: newDatas,
      };
      console.log("qwe");
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  // ! UPDATE

  const getCommentToEdit = async (id) => {
    try {
      const response = await $axios(`comment/get/${id}`);
      let action = {
        type: "GET_COMMENTS_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  const saveEditedComment = async (editedComment, id) => {
    try {
      const response = await $axios.patch(`comment/${id}`, editedComment);
      getCommentsForRoom(editedComment.productId);
      // clearState()
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async (comment) => {
    try {
      await $axios.delete(`comment/${comment.id}`);
      getCommentsForRoom(comment.productId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <commentsContext.Provider
      value={{
        addComments,
        getCommentsForRoom,
        getCommentToEdit,
        deleteComment,
        saveEditedComment,
        comments: state.comments,
        commentToEdit: state.commentToEdit,
        state,
      }}
    >
      {" "}
      {props.children}{" "}
    </commentsContext.Provider>
  );
};

export default CommentContextProvider;
