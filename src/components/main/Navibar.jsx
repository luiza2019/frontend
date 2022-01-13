import { Badge } from "@material-ui/core";
import { Logout } from "@mui/icons-material";

import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { merchContext } from "../../contexts/MerchContext";
import { userContext } from "../../contexts/UserContext";
import { mobile, tablet } from "../../responsive";
import { tablett } from "../../responsive";

const Container = styled.div`
  height: 60px;
  margin-bottom: 10px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
  ${tablett({ display: "none" })}
  ${tablet({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ border: "none", marginBottom: "10px" })}
  ${tablett({ border: "none", marginLeft: "15px", marginBottom: "10px" })}
  ${tablet({ border: "none", marginLeft: "15px", marginBottom: "10px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  ${tablett({ width: "50px" })}
  ${tablet({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })}
  ${tablett({ fontSize: "16px" })}
  ${tablet({ fontSize: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginLeft: "10px", marginBottom: "10px" })}
  ${tablett({ marginBottom: "10px" })}
  ${tablet({ marginBottom: "10px" })}
`;

const Navibar = () => {
  const { logOut } = useContext(userContext);
  const navigate = useNavigate();
  const { getAllMerch } = useContext(merchContext);
  let object = new URLSearchParams(window.location.search);
  function filterMerch(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getAllMerch();
  }

  function handleLogOut() {
    logOut();
    localStorage.clear();
    navigate("/");
  }

  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <MenuItem>HOME</MenuItem>
          <Link
            to="/products/all"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>PRODUCTS</MenuItem>
          </Link>

          <SearchContainer>
            <Input
              placeholder="Search"
              onChange={(e) => filterMerch("q", e.target.value)}
            />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>SHOP</Logo>
        </Center>
        <Right>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <Link to="/cart">
                <ShoppingCartOutlined />
              </Link>
            </Badge>
          </MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <FavoriteBorderOutlinedIcon />
            </Badge>
          </MenuItem>
          {user ? (
            <MenuItem onClick={handleLogOut}>
              <Logout />
            </MenuItem>
          ) : (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navibar;
