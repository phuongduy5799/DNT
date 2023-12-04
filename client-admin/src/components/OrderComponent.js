import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Table, Button } from "semantic-ui-react";
import "./Order.css";

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, "APPROVED");
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, "CANCELED");
  }

  apiGetOrders() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/orders", config)
      .then((res) => {
        const result = res.data;
        this.setState({ orders: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/orders/status/" + id, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetOrders();
        } else {
          alert("SORRY BABY!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { orders, order } = this.state;

    const orderItems = order ? (
      order.items.map((item, index) => (
        <Table.Row key={item.product._id}>
          <Table.Cell>{index + 1}</Table.Cell>
          <Table.Cell>{item.product._id}</Table.Cell>
          <Table.Cell>{item.product.name}</Table.Cell>
          <Table.Cell>
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="70px"
              height="70px"
              alt=""
            />
          </Table.Cell>
          <Table.Cell>{item.product.price}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
          <Table.Cell>{item.product.price * item.quantity}</Table.Cell>
        </Table.Row>
      ))
    ) : null;

    const orderList = orders.map((item) => (
      <Table.Row
        key={item._id}
        className="datatable"
        onClick={() => this.trItemClick(item)}
      >
        <Table.Cell>{item._id}</Table.Cell>
        <Table.Cell>{new Date(item.cdate).toLocaleString()}</Table.Cell>
        <Table.Cell>{item.customer.name}</Table.Cell>
        <Table.Cell>{item.customer.phone}</Table.Cell>
        <Table.Cell>{item.total}</Table.Cell>
        <Table.Cell>{item.status}</Table.Cell>
        <Table.Cell>
          {item.status === "PENDING" ? (
            <div>
              <Button
                className="approve-button"
                onClick={() => this.lnkApproveClick(item._id)}
              >
                APPROVE
              </Button>
              <Button
                className="cancel-button"
                onClick={() => this.lnkCancelClick(item._id)}
              >
                CANCEL
              </Button>
            </div>
          ) : null}
        </Table.Cell>
      </Table.Row>
    ));

    return (
      <div className="order-container">
        <div className="order-list-container">
          <h2 className="order-header">ORDER LIST</h2>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Creation Date</Table.HeaderCell>
                <Table.HeaderCell>Cust.Name</Table.HeaderCell>
                <Table.HeaderCell>Cust.Phone</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{orderList}</Table.Body>
          </Table>
        </div>
        {order && (
          <div className="order-detail-container">
            <h2 className="order-detail-header">ORDER DETAIL</h2>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No.</Table.HeaderCell>
                  <Table.HeaderCell>Prod.ID</Table.HeaderCell>
                  <Table.HeaderCell>Prod.Name</Table.HeaderCell>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{orderItems}</Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default Order;
