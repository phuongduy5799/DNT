import axios from "axios";
import React, { Component } from "react";
import { Form, Input, Button, Select, Image, Modal } from "semantic-ui-react";
import MyContext from "../contexts/MyContext";
import { ToastContainer, toast } from 'react-toastify';
import ReactDOM from 'react-dom';



class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: "",
      txtName: "",
      txtPrice: '0',
      cmbCategory: "",
      imgProduct: "",
      isConfirmModalOpen: false,
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: "data:image/jpg;base64," + this.props.item.image,
      });
    }
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  handleAddClick = (e) => {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    if (txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = {
        name: txtName,
        price: parseInt(txtPrice),
        category: cmbCategory,
        image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ""),
      };
      this.apiPostProduct(prod);
    } else {
      alert("Vui lòng nhập tên, giá, danh mục và hình ảnh");
    }
  };

  handleUpdateClick = (e) => {
    e.preventDefault();
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    if (txtID && txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = {
        name: txtName,
        price: parseInt(txtPrice),
        category: cmbCategory,
        image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ""),
      };
      this.apiPutProduct(txtID, prod);
    } else {
      alert("Vui lòng nhập ID, tên, giá, danh mục và hình ảnh");
    }
  };

  handleDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm("BẠN CÓ CHẮC CHẮN?")) {
      this.openConfirmModal();
    }
  };

  openConfirmModal = () => {
    this.setState({ isConfirmModalOpen: true });
  };

  closeConfirmModal = () => {
    this.setState({ isConfirmModalOpen: false });
  };

  handleConfirmDelete = () => {
    const { txtID } = this.state;
    if (txtID) {
      this.apiDeleteProduct(txtID);
      this.closeConfirmModal();
    } else {
      alert("Vui lòng nhập ID");
    }
  };

  apiPostProduct(prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .post("/api/admin/products", prod, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("Thêm sản phẩm thành công!");
          this.apiGetProducts();
        } else {
          alert("Thêm sản phẩm không thành công!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiGetProducts() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/products?page=" + this.props.curPage, config)
      .then((res) => {
        const result = res.data;
        if (result.products.length !== 0) {
          this.props.updateProducts(result.products, result.noPages);
        } else {
          axios
            .get(
              "/api/admin/products?page=" + (this.props.curPage - 1),
              config
            )
            .then((res) => {
              const result = res.data;
              this.props.updateProducts(result.products, result.noPages);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/categories", config)
      .then((res) => {
        const result = res.data;
        this.setState({ categories: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/products/" + id, prod, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("OK");
          this.apiGetProducts();
        } else {
          alert("Cập nhật sản phẩm thành công!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiDeleteProduct(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .delete("/api/admin/products/" + id, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          toast.success("Xóa sản phẩm thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.apiGetProducts();
        } else {
          toast.error("Xóa sản phẩm không thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
     
  }
  

  render() {
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct, categories, isConfirmModalOpen } =
      this.state;

    const categoryOptions = categories.map((cate) => ({
      key: cate._id,
      value: cate._id,
      text: cate.name,
    }));

    return (
      <div className="product-detail-container">
        <h2 className="text-center">CHI TIẾT SẢN PHẨM</h2>
        <Form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <Input
                    type="text"
                    name="txtID"
                    value={txtID}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>Tên</td>
                <td>
                  <Input
                    type="text"
                    name="txtName"
                    value={txtName}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Giá</td>
                <td>
                  
                <Input
                  step="0.01"
                  type="number"
                  name="txtPrice"
                  value={txtPrice}
                  max={100000000}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Hình ảnh</td>
              <td>
                <Input
                  type="file"
                  name="fileImage"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={this.handleImageChange}
                />
              </td>
            </tr>
            <tr>
              <td>Danh mục</td>
              <td>
                <Select
                  name="cmbCategory"
                  options={categoryOptions}
                  value={cmbCategory}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button primary onClick={this.handleAddClick}>
                  THÊM MỚI
                </Button>
                <Button primary onClick={this.handleUpdateClick}>
                  CẬP NHẬT
                </Button>
                <Button primary onClick={this.handleDeleteClick}>
                  XÓA
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Image src={imgProduct} size="medium" rounded />
              </td>
            </tr>
          </tbody>
        </table>
      </Form>

      <Modal
        open={isConfirmModalOpen}
        onClose={this.closeConfirmModal}
        size="mini"
        className="centered-modal"
      >
        <Modal.Header>XÁC NHẬN XÓA SẢN PHẨM</Modal.Header>
        <Modal.Content>
          <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.closeConfirmModal}>
            Hủy bỏ
          </Button>
          <Button color="green" onClick={this.handleConfirmDelete}>
            Xác nhận
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
}

export default ProductDetail;

