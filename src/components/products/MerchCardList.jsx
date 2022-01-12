import React, { useContext, useEffect, useState } from "react";
import "./merch.css";
import MerchCard from "./MerchCard";
import { merchContext } from "../../contexts/MerchContext";
import { useNavigate, useParams } from "react-router-dom";

const MerchCardList = ({ setPageCount, currentPage }) => {
  const { merch, getItemsByCategory } = useContext(merchContext);
  const params = useParams();
  useEffect(() => {
    getItemsByCategory(params.category);
  }, []);

  let page;
  if (merch) {
    let pCount = Math.ceil(merch.length / 8);
    setPageCount(pCount);
    let start;
    if (currentPage === 1) {
      start = currentPage * 8 - 8;
    } else {
      start = currentPage * 8 - 9;
    }
    let end;
    if (currentPage === 1) {
      end = currentPage * 8;
    } else {
      end = currentPage * 8 - 1;
    }
    page = merch.filter((item, index) => {
      if (index >= start && index < end) {
        return [item];
      }
    });
  } else {
    page = <div></div>;
  }
  console.log(merch);
  return (
    <div className="merchCardList">
      {page.map((item) => (
        <MerchCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MerchCardList;
