import axios from "axios";
import React, { Component } from "react";
import { Table, Header, Grid, Segment, Card, Button, Icon, Transition } from "semantic-ui-react";
import MyContext from "../contexts/MyContext";
import CategoryDetail from "./CategoryDetailComponent";
import "semantic-ui-css/semantic.min.css";

import "./Category.css";

class Category extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
      isCardVisible: false,
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  trItemClick = (item) => {
    this.setState({ itemSelected: item });
  };

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  apiGetCategories = () => {
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
  };

  handleCardVisible = () => {
    this.setState((prevState) => ({
      isCardVisible: !prevState.isCardVisible,
    }));
  };

  renderCategoryCards = () => {
    const { categories } = this.state;
    return categories.map((item, index) => (
      <Transition visible={this.state.isCardVisible} animation="scale" duration={500} key={item._id}>
        <Card onClick={() => this.trItemClick(item)}>
          <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>ID: {item._id}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" fluid onClick={() => this.trItemClick(item)}>
              View Details
            </Button>
          </Card.Content>
        </Card>
      </Transition>
    ));
  };

  render() {
    const { itemSelected } = this.state;

    return (
      <div className="category-container">
        <Grid columns={2} stackable>
          <Grid.Column width={6}>
            <Segment className="category-segment">
              <Header as="h2" textAlign="center">
                DANH MỤC
              </Header>
              <Button primary fluid onClick={this.handleCardVisible}>
                {this.state.isCardVisible ? "Ẩn Danh mục" : "Hiển thị Danh mục"}
              </Button>
              <Card.Group itemsPerRow={3} stackable>
                {this.renderCategoryCards()}
              </Card.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <Header as="h2" textAlign="center">
                CHI TIẾT DANH MỤC
              </Header>
              <CategoryDetail item={itemSelected} updateCategories={this.updateCategories} />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Category;
