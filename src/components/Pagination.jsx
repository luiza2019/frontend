import { Button } from "react-bootstrap";
import React, { useContext, useEffect } from "react";
import { merchContext } from "../contexts/MerchContext";

const Pagination = () => {
  const { merch, getMerch, countOfMerch } = useContext(merchContext);
  const pageNumbers = [];
  const handlePage = (page) => {
    getMerch(page.toString());
  };
  useEffect(() => {
    getMerch();
  }, []);
  // console.log(countOfProducts);
  for (let i = 1; i <= Math.ceil(countOfMerch / 8); i++) {
    pageNumbers.push(i);
  }
  console.log(merch);
  return (
    <div className="pagination-div">
      <ul>
        {pageNumbers.map((page) => (
          <li key={page}>
            <Button
              variant="outline-success"
              style={{
                backgroundColor: "#1C374C",
                border: "none",
                padding: "0 20px",
                display: "inline-block",
                height: "30px",
                marginTop: "13px",
                marginRight: "10px",
              }}
              onClick={() => {
                handlePage(page);
              }}
            >
              {page}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
