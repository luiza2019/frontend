import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { merchContext } from "../../contexts/MerchContext";
import { Button } from "@mui/material";
import Navibar from "../main/Navibar";
import "./merch.css";
import Comment from "./../comments/Comment";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { getProductsToEdit, addAndDeleteMerchInCart, merchToEdit } =
    useContext(merchContext);
  const params = useParams();
  useEffect(() => {
    getProductsToEdit(params.id);
  }, []);
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navibar />
      {merchToEdit ? (
        <div className="detail-page">
          <div className="detail-image">
            <img src={merchToEdit.img} alt="" />
          </div>
          <div>
            <h2>{merchToEdit.name}</h2>
            {/* <p>{merchDetails.description}</p> */}

            <div>
              <h4>Характеристики</h4>
              <ul className="characteristic">
                <li>
                  <strong>Цена:</strong>
                  <span>{merchToEdit.price}</span>
                </li>
                {/* <li>
                  <strong>Цвет:</strong>
                  <span>{merchDetails.color}</span>
                </li> */}
                <li>
                  <strong>Бренд:</strong>
                  <span>{merchToEdit.brand}</span>
                </li>
                <li>
                  <strong>Тип:</strong>
                  <span>{merchToEdit.type}</span>
                </li>
              </ul>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                addAndDeleteMerchInCart();
                navigate("/cart");
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      <div>
        <Comment />
      </div>
    </div>
  );
};

export default ProductDetail;
