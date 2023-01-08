import React from "react";
import { Link } from "react-router-dom";
import Styles from "../css/product.module.css";

const Product = ({ id, name, images, info, category_id }) => {
  return (
    <article className={Styles.product}>
      <div className="img-container">
        <img src={images[0]} alt={name} />
      </div>
      <div className={Styles.product_footer}>
        <p>{name}</p>
        <p>{info}</p>
        <Link to={`/user/products/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
      </div>
    </article>
  );
};

export default Product;
