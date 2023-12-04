import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  static contextType = MyContext;

  state = {
    menuOpen: true, // Mặc định menu được mở
  };

  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  };

  render() {
    const { menuOpen } = this.state;
    const menuContentClass = `menu-content ${menuOpen ? "open" : ""}`;

    return (
      <div className="menu-container">
        <input
          type="checkbox"
          id="menu-toggle"
          checked={menuOpen}
          onChange={this.toggleMenu}
        />
        <label htmlFor="menu-toggle" className="menu-toggle-label">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav className={menuContentClass}>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin/home">Trang chủ</Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/category">Danh mục</Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/product">Sản phẩm</Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/order">Đơn hàng</Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/customer">Khách hàng</Link>
            </li>
            <li className="menu-item">
              <span className="greeting">Xin chào, admin</span>
            </li>
            <li className="menu-item">
              <span className="logout" onClick={() => this.lnkLogoutClick()}>
                Đăng xuất
              </span>
            </li>
          </ul>
        </nav>
        <div className="menu-right">
          <span className="username">{this.context.username}</span>
        </div>
      </div>
    );
  }
}

export default Menu;


