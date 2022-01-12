import React from "react";
import Categories from "./Categories";
import Navibar from "./Navibar";
import Slider from "./Slider";
import Products from "./Products";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
// import CommentList from "../comments/CommentList";

const MainStructure = () => {
  return (
    <div>
      <Navibar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
      {/* <CommentList /> */}
    </div>
  );
};

export default MainStructure;
