import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { merchContext } from "../../contexts/MerchContext";
// import "./merch.css";
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  Search,
} from "@material-ui/icons";
import $axios from "../../axios";

import styled from "styled-components";
import { mobile } from "../../responsive";
import Pagination from "../Pagination";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding-bottom: -5px;
  border: none;
`;

const Input = styled.input`
  // border: none;
  ${mobile({ width: "50px" })}
`;

const MerchRightSide = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const { merchCountInCart, getAllMerch, deleteOneMerch, merch, getMerch } =
    useContext(merchContext);
  const navigate = useNavigate();
  let object = new URLSearchParams(window.location.search);
  const [typeValue, setTypeValue] = useState("");

  function filterMerch(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getMerch();
    setTypeValue(value);
  }
  const params = useParams();
  useEffect(() => {
    getMerch();
  }, []);

  function styleLine(myLoc) {
    if (params.category === myLoc) {
      return {
        textDecoration: "none",
        color: "teal",
        borderBottomWidth: "1.5px",
        borderBottomColor: "white",
        borderBottomStyle: "solid",
      };
    } else {
      return { textDecoration: "none", color: "white" };
    }
  }
  const getProducts = async () => {
    try {
      const { data } = await $axios.get("/product");
      console.log(data);
      setData(data.rows);
    } catch (error) {
      console.log(error);
      console.log("error ");
    }
  };
  const handleDelete = async (id) => {
    deleteOneMerch(id);
  };
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    const { data } = await $axios.get("/product?limit=20&q=" + value);
    console.log(data);
    setData(data.rows);
  };

  return (
    <div className="rightSideMerch">
      <div className="merchNavbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="MerchHeaderText">All Products</h2>
        </Link>

        <SearchContainer>
          <Input
            type="text"
            placeholder="Search a product"
            onChange={handleSearch}
            value={search}
          />
          <Search style={{ color: "gray", fontSize: 16 }} />
        </SearchContainer>
        <div className="m-n">
          <Link to="/cart">
            <IconButton size="large" aria-label="show 4 new mails" color="info">
              <Badge badgeContent={merchCountInCart} color="error">
                <ShoppingCartOutlined sx={{ fontSize: 28, color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/cart">
            <IconButton size="large" aria-label="show 4 new mails" color="info">
              <Badge badgeContent={merchCountInCart} color="error">
                <FavoriteBorderOutlined sx={{ fontSize: 28, color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="categories">
        <a href="/products/all" style={styleLine("all")}>
          <h4 className="MerchHeaderText"> All </h4>
        </a>
        <a href="/products/formal" style={styleLine("formal")}>
          <h4 className="MerchHeaderText">Formal</h4>
        </a>
        <a href="/products/suit" style={styleLine("suit")}>
          <h4 className="MerchHeaderText">Suit</h4>
        </a>
        <a href="/products/casual" style={styleLine("casual")}>
          <h4 className="MerchHeaderText">Casual</h4>
        </a>
      </div>
      {/* <div className="merchCard">
        <MerchCardList setPageCount={setPageCount} currentPage={currentPage} />
      </div> */}
      <div className="main-cards" style={{ color: "black" }}>
        {merch ? (
          merch.map((p) => (
            <div key={p.id} className="main-cardss">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={p.img} />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.price}</Card.Text>
                  <Card.Title>{p.brand}</Card.Title>
                  <Card.Title>{p.type}</Card.Title>

                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/detail/${p.id}`);
                    }}
                  >
                    Update
                  </Button>

                  <Button onClick={() => handleDelete(p.id)} variant="primary">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <></>
        )}
        <Pagination />
      </div>
    </div>
  );
};

export default MerchRightSide;
