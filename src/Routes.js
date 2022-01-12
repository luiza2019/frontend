import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContextProvider from "./contexts/MainContext";
import MerchContextProvider from "./contexts/MerchContext";

import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RightSideCart from "./components/cart/RightSideCart";
import CreditMainPage from "./components/creditCard/CreditMainPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import UserContextProvider from "./contexts/UserContext";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import CommentContextProvider from "./contexts/CommentsContext";

const MyRoutes = () => {
  return (
    <CommentContextProvider>
      <UserContextProvider>
        <MerchContextProvider>
          <MainContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />

                <Route
                  exact
                  path="/products/:category"
                  element={<ProductPage />}
                />
                <Route exact path="/cart" element={<RightSideCart />} />
                <Route exact path="/credit" element={<CreditMainPage />} />
                <Route path="/merch/:id" element={<DetailPage />} />

                <Route path="/add" element={<AddPage />} />

                <Route path="/detail/:id" element={<EditPage />} />
              </Routes>
            </BrowserRouter>
          </MainContextProvider>
        </MerchContextProvider>
      </UserContextProvider>
    </CommentContextProvider>
  );
};

export default MyRoutes;
