import axios from "axios";
import React, { Component } from "react";
import { Table, Header, Image, Pagination } from "semantic-ui-react";
import MyContext from "../contexts/MyContext";
import ProductDetail from "./ProductDetailComponent";
import "./Product.css";

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
      isLoading: true, // Thêm trạng thái để xác định khi nào dữ liệu được tải
    };
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  updateProducts = (products, noPages) => {
    this.setState({ products: products, noPages: noPages, isLoading: false });
  };

  lnkPageClick = (index) => {
    this.apiGetProducts(index);
  };

  trItemClick = (item) => {
    this.setState({ itemSelected: item });
  };

  apiGetProducts(page) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get(`/api/admin/products?page=${page}`, config)
      .then((res) => {
        const result = res.data;
        this.setState({
          products: result.products,
          noPages: result.noPages,
          curPage: result.curPage,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { products, curPage, noPages, itemSelected, isLoading } = this.state;

    const prods = products.map((item) => (
      <Table.Row
        key={item._id}
        className="datatable"
        onClick={() => this.trItemClick(item)}
      >
        <Table.Cell>{item._id}</Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
        <Table.Cell>{new Date(item.cdate).toLocaleString()}</Table.Cell>
        <Table.Cell>{item.category.name}</Table.Cell>
        <Table.Cell>
          <Image
            src={"data:image/jpg;base64," + item.image}
            size="tiny"
            centered
          />
        </Table.Cell>
      </Table.Row>
    ));

    return (
      <div className="product-container">
        <div className="product-list">
          <Header as="h2" textAlign="center">
            PRODUCT LIST
          </Header>
          {isLoading ? (
            <Table celled className="datatable skeleton-table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Creation Date</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* Tạo các hàng skeleton */}
                <Table.Row>
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                  <Table.Cell className="skeleton-cell" />
                </Table.Row>
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    <Pagination
                      activePage={curPage}
                      totalPages={noPages}
                      onPageChange={(_, data) =>
                        this.lnkPageClick(data.activePage)
                      }
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          ) : (
            <Table celled className="datatable">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Creation Date</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{prods}</Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    <Pagination
                      activePage={curPage}
                      totalPages={noPages}
                      onPageChange={(_, data) =>
                        this.lnkPageClick(data.activePage)
                      }
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          )}
        </div>
        <div className="product-detail">
          <ProductDetail
            item={itemSelected}
            curPage={curPage}
            updateProducts={this.updateProducts}
          />
        </div>
      </div>
    );
  }
}

export default Product;
