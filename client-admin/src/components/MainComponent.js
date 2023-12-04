import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Category from "./CategoryComponent";
import Product from "./ProductComponent";
import Order from "./OrderComponent";
import Customer from "./CustomerComponent";
import MyContext from "../contexts/MyContext";

class Main extends Component {
  render() {
    const { token } = this.context; // Lấy token từ context

    if (token !== "") {
      return (
        <div className="body-admin">
          <Menu />
          <div className="content-admin">
            <Routes>
              <Route path="/admin" element={<Navigate replace to="/admin/home" />} />
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/product" element={<Product />} />
              <Route path="/admin/order" element={<Order />} />
              <Route path="/admin/customer" element={<Customer />} />
            </Routes>
          </div>
        </div>
      );
    }

    // Trả về null nếu không có token
    return null;
  }
}

Main.contextType = MyContext; // Sử dụng this.context để truy cập vào global state

export default Main;
