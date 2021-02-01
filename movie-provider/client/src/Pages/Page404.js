import React from "react";
import errorImage from "../assets/404.png";

const Page404 = () => {
  return (
    <div className="page-404">
      <img className="page-404__img" src={errorImage} alt="404 Image" />
      <h1 className="page-404__title">Wrong page you have found.</h1>
    </div>
  );
};

export default Page404;
