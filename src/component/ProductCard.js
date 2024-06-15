import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from "react";
import { likeActions } from "../action/likeAction";

import "../style/productCard.style.css";

const ProductCard = ({product, liked}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(liked);

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const addLikeList = (event) => {
    event.stopPropagation();
    dispatch(likeActions.likeAddRequest(product._id, setIsLiked));
  };
  
  const deleteLikeList = (event) =>{
    event.stopPropagation();
    dispatch(likeActions.likeAddRequest(product._id, setIsLiked));
    setIsLiked(false);
  }

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img
        src={product.image}
        alt={product.name}
      />
      <div>{product.name}</div>
      <div>₩ {product.price}</div>
      <div className="align-right">
        <div 
          className={isLiked? "like-button like-active" : "like-button"} 
          onClick={isLiked? deleteLikeList : addLikeList}>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
