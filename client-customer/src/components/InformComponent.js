import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Text, Avatar, Badge, Spacer } from "@nextui-org/react";
import MyContext from "../contexts/MyContext";
import "./Inform.css"; 
import { ShoppingCart } from "react-feather";

const Inform = () => {
  const { mycart, setMycart, setToken, setCustomer } = useContext(MyContext);
  const token = localStorage.getItem("token");
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    setMycart([]);
    setToken("");
    setCustomer(null);
  };

  return (
    <Grid.Container gap={1} justifyContent="space-between" alignItems="center" className="inform-container">
      <Grid xs={12} sm={4} textAlign="left" className="animate__animated animate__fadeInLeft">
        <div className="inform-logo-left">
          <ShoppingCart size={24} className="inform-icon" />
          <Text h3 className="inform-logo-text">DNT FAST FOOD</Text>
        </div>
      </Grid>
      <Grid xs={12} sm={4} textAlign="center" className="animate__animated animate__fadeIn">
        {!token ? (
          <div className="inform-links">
            <Link to="/login" className="inform-link">Đăng nhập</Link> |
            <Link to="/signup" className="inform-link">Đăng ký</Link> |
            <Link to="/active" className="inform-link">Kích hoạt</Link>
          </div>
        ) : (
          <div className="inform-links">
            <Avatar src={customer.avatar} size="small" />
            <Spacer x={0.5} />
            Xin chào,{" "}
            <Text b className="inform-customer-name">{customer.name}</Text> |
            <Link to="/myprofile" className="inform-link">Hồ sơ của tôi</Link> |
            <Link to="/myorders" className="inform-link">Đơn hàng </Link> |
            <Button auto primary as={Link} to="/home" onClick={handleLogout} className="inform-button">
              Đăng xuất
            </Button>
          </div>
        )}
      </Grid>
      <Grid xs={12} sm={4} textAlign="right" className="animate__animated animate__fadeInRight">
        <Link to="/mycart" className="inform-cart">
          <Badge scale="1.5" count={mycart.length}>
            <ShoppingCart size={24} className="inform-icon" />
          </Badge>
          <Text>Giỏ hàng</Text>
        </Link>
      </Grid>
    </Grid.Container>
  );
};

export default Inform;