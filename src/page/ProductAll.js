import React, { useEffect,useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { likeActions } from "../action/likeAction";


const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const products = useSelector((state)=>state.product.productList);
  const likeList = useSelector((state) => state.like.likeList);
  const [query] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    name: query.get("name") || "",
  });

  useEffect(() => {
    setSearchQuery({
      name: query.get("name") || "",
    });
  }, [query]);

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [searchQuery]);

  useEffect(()=>{
    console.log("likeList",likeList);
  },[likeList]);

  useEffect(()=>{
    dispatch(likeActions.getLikeList());
  },[]);

  return (
    <Container>
      <Row>
        {products.length!==0?products.map((product) => (
          <Col key={product.id} md={3} sm={12}>
            {likeList.some(item => item.productId === product.id) ? (
              <ProductCard product={product} liked={true} />
            ) : (
              <ProductCard product={product} liked={false} />
            )}
          </Col>
        )): <div className="text-center">찾으시는 상품이 없습니다.</div>}
      </Row>
    </Container>
  );
};

export default ProductAll;
