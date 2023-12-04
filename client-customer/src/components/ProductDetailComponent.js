import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import axios from "axios";
import MyContext from "../contexts/MyContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { mycart, setMycart } = useContext(MyContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const history = useParams();

  useEffect(() => {
    apiGetProduct(id);
  }, [id]);

  const apiGetProduct = (id) => {
    axios
      .get(`http://localhost:4000/api/customer/products/${id}`)
      .then((res) => {
        const result = res.data;
        setProduct(result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      });
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingItem = mycart.find((item) => item.product._id === product._id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };

        const updatedCart = mycart.map((item) =>
          item.product._id === product._id ? updatedItem : item
        );

        setMycart(updatedCart);
      } else {
        const newItem = {
          product: product,
          quantity: quantity,
        };

        setMycart([...mycart, newItem]);
      }

      alert("Thêm vào giỏ hàng thành công!");
    } else {
      alert("Vui lòng nhập số lượng hợp lệ.");
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-container">
      <h4 className="product-detail-title">CHI TIẾT SẢN PHẨM</h4>
      <Grid>
        <Grid.Column width={10}>
          <Card fluid className="product-detail-card">
            <div className="product-detail-image">
              <Image src={`data:image/jpg;base64,${product.image}`} alt="" size="medium" />
            </div>
            <Card.Content>
              <Card.Description>
                <p>Tên: {product.name}</p>
                <p>Giá: {product.price}</p>
                <p>Danh mục: {product.category.name}</p>
                <p>Mô tả: {product.description}</p>
              </Card.Description>
              <Card.Content extra>
                <div className="product-detail-buttons">
                  <Button primary onClick={handleAddToCart} className="product-detail-button">
                    THÊM VÀO GIỎ HÀNG
                  </Button>
                  <Button secondary onClick={handleGoBack} className="product-detail-button">
                    QUAY LẠI
                  </Button>
                </div>
              </Card.Content>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProductDetail;
