import React, { useContext, useEffect, useState } from "react";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styled from "styled-components";
import { mobile } from "../../responsive";
import Pagination from "../Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./merch.css";
import { userContext } from "../../contexts/UserContext";
import { MenuItem } from "@material-ui/core";

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding-bottom: -5px;
  border: none;
`;

const Input1 = styled.input`
  // border: none;
  ${mobile({ width: "50px" })}
`;

const AllProducts = ({ p }) => {
  const { logOut } = useContext(userContext);

  const {
    merchCountInCart,
    getAllMerch,
    deleteOneMerch,
    merch,
    getMerch,
    checkMerchInCart,
    addAndDontDeleteMerchInCart,
    addAndDeleteMerchInCart,
  } = useContext(merchContext);

  useEffect(() => {
    getMerch();
  }, []);
  const navigate = useNavigate();
  const [typeValue, setTypeValue] = useState("");

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  let object = new URLSearchParams(window.location.search);
  function filterMerch(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getMerch();
    setTypeValue(value);
  }
  useEffect(() => {
    setTypeValue(object.get("type"));
  }, [object]);

  // const handleSearch = async (e) => {
  //   const value = e.target.value;
  //   setSearch(value);
  //   const data = await $axios.get("/product?limit=20&q=" + value);
  //   console.log(data);
  //   setData(data.rows);
  // };

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

  function handleABuy() {
    addAndDontDeleteMerchInCart();
    navigate("/cart");
  }
  function handleLogOut() {
    logOut();
    localStorage.clear();
    navigate("/");
  }
  const user = JSON.parse(localStorage.getItem("token"));

  return (
    <div>
      <div className="merchNavbar">
        <Link
          to="/"
          style={{ textDecoration: "none", justifyContent: "center" }}
        >
          <h2 className="MerchHeaderText">All Products</h2>
        </Link>

        <SearchContainer>
          <Input1
            type="text"
            inputProps={{ "aria-label": "search" }}
            placeholder="Search a product"
            onChange={(e) => {
              filterMerch("q", e.target.value);
            }}
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
      <div>
        <select
          id=""
          value="typeValue"
          onChange={(e) => filterMerch("type", e.target.value)}
        >
          <option value="Type">Type</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Suit">Suit</option>
        </select>
      </div>
      <div className="main-cards" style={{ color: "blue" }}>
        {merch ? (
          merch.map((p) => (
            <div key={p.id} className="main-cardss" style={{ color: "red" }}>
              <Card
                sx={{
                  maxWidth: 250,
                  marginRight: "20px",
                  minWidth: 250,
                  height: 350,
                  marginTop: 5,
                  bgcolor: "fcf1ed",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  object-fit="cover"
                  image={p.img}
                  alt=""
                />
                <CardContent
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      color: "teal",
                      fontSize: "18px",
                      fontWeight: 400,
                    }}
                  >
                    {p.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "teal", fontSize: "18px", fontWeight: 400 }}
                  >
                    {p.price}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "teal", fontSize: "18px", fontWeight: 400 }}
                  >
                    {p.type}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    height: 0,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    // onClick={(e) => handleAddToCart(e)}
                    onClick={() => addAndDeleteMerchInCart(p)}
                  >
                    <ShoppingCartIcon
                      color={checkMerchInCart(p.id) ? "error" : "white"}
                    />
                  </Button>

                  <Button
                    onClick={() => handleABuy()}
                    sx={{ marginLeft: "10px" }}
                    variant="contained"
                  >
                    Buy
                  </Button>
                  {user ? (
                    <Link to="/add">
                      <Button
                        sx={{ marginLeft: "10px" }}
                        variant="contained"
                        onClick={(e) => navigate()}
                      >
                        Add
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/merch/${p.id}`}>
                      <Button
                        sx={{ marginLeft: "10px" }}
                        variant="contained"
                        // onClick={(e) => navigate("/")}
                      >
                        More
                      </Button>
                    </Link>
                  )}
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="pagination">
        <div pagination-div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
