import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Card, Image } from 'antd';
import MyContext from "../contexts/MyContext";  
import axios from "axios";

class MyOrders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedOrder: null,
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  trItemClick(item) {
    this.setState({ selectedOrder: item });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/customer/orders/customer/" + cid, config)
      .then((res) => {
        const result = res.data;
        this.setState({ orders: result });
      });
  }

  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;
    return (
      <div>
        <h2>Danh sách đơn hàng</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {this.state.orders.map(order => (
              <Card              
                key={order._id}          
                onClick={() => this.trItemClick(order)} 
                hoverable
              >
                <Card.Meta 
                  title={order._id} 
                  description = {`${order.customer.name} - ${order.customer.phone}`}
                />
                <p>Total: {order.total}</p>
                <p>Status: {order.status}</p>           
              </Card>
            ))}
          </div>
          {this.state.selectedOrder && (
            <div>
              <h2>Chi tiết đơn hàng</h2>
              {this.state.selectedOrder.items.map(item => (  
                <Card
                  key={item.product._id}
                  hoverable
                >
                  <Card.Meta 
                    avatar={<Image src={`data:image/jpg;base64,${item.product.image}`} />}
                    title={item.product.name}
                    description={`${item.quantity} x ${item.product.price}`}
                  />
                  <p>{item.product.price * item.quantity}</p>
                </Card>                   
              ))}
            </div>
          )}  
        </div>
      </div>
    )
  }
}
  
export default MyOrders;