import React, { useEffect,useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";


const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const products = useSelector((state)=>state.product.productList);
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

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={3} sm={12}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
