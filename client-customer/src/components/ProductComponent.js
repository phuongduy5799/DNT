import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card as NextCard, Image as NextImage, Spinner, Button } from "@nextui-org/react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "react-feather";
import "./Product.css";
import "./skeleton.css";

const fetchProductsByCategory = async (categoryId) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/customer/products/category/${categoryId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    return [];
  }
};

const fetchProductsByKeyword = async (searchKeyword) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/customer/products/search/${searchKeyword}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo từ khóa:", error);
    return [];
  }
};

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cid, keyword } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [cid, keyword]);

  const fetchProducts = async () => {
    setLoading(true);
    let fetchedProducts = [];
    if (cid) {
      fetchedProducts = await fetchProductsByCategory(cid);
    } else if (keyword) {
      fetchedProducts = await fetchProductsByKeyword(keyword);
    }
    setProducts(fetchedProducts);
    setLoading(false);
  };

  const renderProductList = () => {
    return products.map((item) => (
      <motion.div
        key={item._id}
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        
      >
        <NextCard hoverable> 
          <Link to={`/product/${item._id}`}>
            <NextImage src={`data:image/jpg;base64,${item.image}`} alt={item.name} />
          </Link>
          <div className="card-content">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>Giá: {new Intl.NumberFormat().format(item.price)} đ</p>
            <div className="card-actions">
              
            </div>
          </div>
        </NextCard>
      </motion.div>
    ));
  };

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="product-container">
      <h2 className="product-title">{cid ? `Danh mục` : `Kết quả tìm kiếm cho "${keyword}"`}</h2>
      {loading ? (
        <Spinner size="large" color="primary" />
      ) : (
        <Masonry breakpointCols={breakpointColumns} className="product-grid" columnClassName="product-grid-column">
          {renderProductList()}
        </Masonry>
      )}
    </div>
  );
}
export default Product;