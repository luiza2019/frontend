import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import MerchCardList from "./MerchCardList";
import { useNavigate, useParams } from "react-router";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { merchContext } from "../../contexts/MerchContext";
import "./merch.css";
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  Search,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../responsive";

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
  const { merchCountInCart, getAllMerch } = useContext(merchContext);
  const navigate = useNavigate();
  let object = new URLSearchParams(window.location.search);
  function filterMerch(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getAllMerch();
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  function styleLine(myLoc) {
    if (params.category === myLoc) {
      return {
        textDecoration: "none",
        color: "white",
        borderBottomWidth: "1.5px",
        borderBottomColor: "white",
        borderBottomStyle: "solid",
      };
    } else {
      return { textDecoration: "none", color: "white" };
    }
  }

  function handlePageNext() {
    if (currentPage !== pageCount) {
      let pageN = currentPage + 1;
      setCurrentPage(pageN);
    }
  }

  function handlePagePrev() {
    if (currentPage !== 1) {
      let pageN = currentPage - 1;
      setCurrentPage(pageN);
    }
  }

  let admin = localStorage.getItem("admin");
  let addBtn;
  if (admin === "true") {
    addBtn = (
      <Button
        sx={{
          fontSize: 15,
          height: "32px",
          marginRight: "20px",
          marginTop: "12px",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Add
      </Button>
    );
  } else {
    addBtn = <div></div>;
  }

  return (
    <div className="rightSideMerch">
      <div className="merchNavbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="MerchHeaderText">All Products</h2>
        </Link>

        <SearchContainer>
          <Input
            placeholder="Search"
            onChange={(e) => filterMerch("q", e.target.value)}
          />
          <Search style={{ color: "gray", fontSize: 16 }} />
        </SearchContainer>
        <div className="m-n">
          {addBtn}

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

      <div className="merchCard">
        <MerchCardList setPageCount={setPageCount} currentPage={currentPage} />
      </div>
      <div className="pagination">
        {currentPage === 1 ? (
          <Button
            disabled
            onClick={() => handlePagePrev()}
            sx={{ fontSize: 20 }}
          >
            prev
          </Button>
        ) : (
          <Button onClick={() => handlePagePrev()} sx={{ fontSize: 20 }}>
            prev
          </Button>
        )}
        {currentPage === pageCount ? (
          <Button
            disabled
            onClick={() => handlePageNext()}
            sx={{ fontSize: 20 }}
          >
            next
          </Button>
        ) : (
          <Button onClick={() => handlePageNext()} sx={{ fontSize: 20 }}>
            next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MerchRightSide;
