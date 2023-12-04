import axios from "axios";
import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import MyContext from "../contexts/MyContext";

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
    };
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  // event handlers
  trCustomerClick = (item) => {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  };

  trOrderClick = (item) => {
    this.setState({ order: item });
  };

  lnkDeactiveClick = (item) => {
    this.apiPutCustomerDeactive(item._id, item.token);
  };

  lnkEmailClick = (item) => {
    this.apiGetCustomerSendmail(item._id);
  };

  // API methods
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { "x-access-token": this.context.token } };

    axios
      .put("/api/admin/customers/deactive/" + id, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetCustomers();
        } else {
          alert("SORRY BABY!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiGetCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };

    axios
      .get("/api/admin/customers", config)
      .then((res) => {
        const result = res.data;
        this.setState({ customers: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };

    axios
      .get("/api/admin/orders/customer/" + cid, config)
      .then((res) => {
        const result = res.data;
        this.setState({ orders: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { "x-access-token": this.context.token } };

    axios
      .get("/api/admin/customers/sendmail/" + id, config)
      .then((res) => {
        const result = res.data;
        alert(result.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { customers, orders, order } = this.state;

    const customerRows = customers.map((item) => (
      <Table.Row
        key={item._id}
        className="datatable"
        onClick={() => this.trCustomerClick(item)}
      >
        <Table.Cell>{item._id}</Table.Cell>
        <Table.Cell>{item.username}</Table.Cell>
        <Table.Cell>{item.password}</Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.phone}</Table.Cell>
        <Table.Cell>{item.email}</Table.Cell>
        <Table.Cell>{item.active}</Table.Cell>
        <Table.Cell>
          {item.active === 0 ? (
            <Button className="link" onClick={() => this.lnkEmailClick(item)}>
              EMAIL
            </Button>
          ) : (
            <Button className="link" onClick={() => this.lnkDeactiveClick(item)}>
              DEACTIVE
            </Button>
          )}
        </Table.Cell>
      </Table.Row>
    ));

    const orderRows = orders.map((item) => (
      <Table.Row
        key={item._id}
        className="datatable"
        onClick={() => this.trOrderClick(item)}
      >
        <Table.Cell>{item._id}</Table.Cell>
        <Table.Cell>{new Date(item.cdate).toLocaleString()}</Table.Cell>
        <Table.Cell>{item.customer.name}</Table.Cell>
        <Table.Cell>{item.customer.phone}</Table.Cell>
        <Table.Cell>{item.total}</Table.Cell>
        <Table.Cell>{item.status}</Table.Cell>
      </Table.Row>
    ));

    const itemRows =
      order &&
      order.items.map((item, index) => (
        <Table.Row key={item.product._id} className="datatable">
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
      ));

    return (
      <div className="customer-container">
        <div className="align-center">
          <h2 className="customer-header">CUSTOMER LIST</h2>
          <Table celled className="datatable">
            <Table.Header>
              <Table.Row className="datatable">
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Password</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{customerRows}</Table.Body>
          </Table>
        </div>

        {orders.length > 0 && (
          <div className="order-list-container">
            <h2 className="order-header">ORDER LIST</h2>
            <Table celled className="datatable">
              <Table.Header>
                <Table.Row className="datatable">
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Creation date</Table.HeaderCell>
                  <Table.HeaderCell>Cust.name</Table.HeaderCell>
                  <Table.HeaderCell>Cust.phone</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Body>{orderRows}</Table.Body>
            </Table>
          </div>
        )}

        {order && (
          <div className="order-detail-container">
            <h2 className="order-detail-header">ORDER DETAIL</h2>
            <Table celled className="datatable">
              <Table.Header>
                <Table.Row className="datatable">
                  <Table.HeaderCell>No.</Table.HeaderCell>
                  <Table.HeaderCell>Prod.ID</Table.HeaderCell>
                  <Table.HeaderCell>Prod.name</Table.HeaderCell>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{itemRows}</Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default Customer;

