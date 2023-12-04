// Home.js
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Header, Image, Icon, Rating } from "semantic-ui-react";
import Skeleton from "react-loading-skeleton";
import "./Home.css";
import "./skeleton.css";
import ContentLoader from "react-content-loader";
import CarouselSkeleton from './CarouselSkeleton';
import CustomerSupport from "./CustomerSupport";
import axios from "axios"; // Import axios
// Import Next UI components
import { Card as NextCard, Text, Image as NextImage } from "@nextui-org/react";
import { Card } from "semantic-ui-react"; // Import Card from Semantic UI React
import profile1 from "../images/profile1.jpg";
import profile2 from "../images/profile2.jpeg";
import profile3 from "../images/profile3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hinhslide1 from "../images/hinh-slide.jpg";
import hinhslide2 from "../images/hinh-slide2.jpg";
import hinhslide3 from "../images/hinh-slide3.jpg";
import VisibilitySensor from "react-visibility-sensor";
import { motion, useAnimation } from "framer-motion";
// Import react-scroll components
import { Link, Element } from "react-scroll";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      loading: true,
    };
  }
  
  
  renderSectionTitle(title) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        style={{ marginBottom: "20px" }} // Add margin-bottom here
      >
        <Header
          as="h2"
          textAlign="center"
          className="section-title"
          style={{
            fontSize: "32px", 
            color: "#ff5722", 
            borderBottom: "2px solid #ff5722", 
            paddingBottom: "10px"
          }}
        >
          {title}
        </Header>
      </motion.div>
    );
  }


  componentDidMount() {
    Promise.all([this.apiGetNewProducts(), this.apiGetHotProducts()])
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
        this.setState({ loading: false });
      });
  }

  apiGetNewProducts() {
    return axios
      .get("http://localhost:4000/api/customer/products/new")
      .then((res) => {
        const result = res.data;
        this.setState({ newprods: result });
      });
  }

  apiGetHotProducts() {
    axios
      .get("http://localhost:4000/api/customer/products/hot")
      .then((res) => {
        const result = res.data;
        this.setState({ hotprods: result });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm hot:", error);
      });
  }

  renderSkeletonCard() {
    return (
      <ContentLoader 
        speed={2}
        width={400}
        height={460}
        viewBox="0 0 400 460"
        backgroundColor="#d1d1d1"
        foregroundColor="#bcbcbc"
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="20" cy="20" r="20" /> 
        <rect x="0" y="140" rx="5" ry="5" width="400" height="300" />
        <rect x="0" y="450" rx="5" ry="5" width="200" height="10" />
      </ContentLoader>
    );
  }
  

  renderProductList(products) {
    // Show skeleton loading screen while data is being fetched
    if (this.state.loading) {
      return (
        <Grid columns={3} centered stackable className="product-list">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Grid.Column key={index}>
              <motion.div
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {this.renderSkeletonCard()}
              </motion.div>
            </Grid.Column>
          ))}
        </Grid>
      );
    }
  
    return (
      <Grid columns={3} centered stackable className="product-list">
        {products.map((item) => (
          <Grid.Column key={item._id}>
            <motion.div
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/product/${item._id}`}>
                <NextCard shadow>
                  <NextCard.Body>
                    <NextImage
                      src={`data:image/jpg;base64,${item.image}`}
                      alt={item.name}
                      width="100%"
                      height={200}
                      objectFit="cover"
                    />
                    <Text h4>{item.name}</Text>
                    <Text>Giá: {item.price}</Text>
                  </NextCard.Body>
                </NextCard>
              </Link>
            </motion.div>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
  renderReviews(reviews) {
    return (
      <div className="review-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <img src={review.profileImage} alt={review.customerName} />
            <div className="review-content">
              <Rating icon="star" defaultRating={review.rating} maxRating={5} disabled />
              <Header as="h4">{review.customerName}</Header>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  render() {
    const { newprods, hotprods, loading } = this.state;
 // Sample customer reviews data
 
 const reviews = [
  {
    customerName: "Trần Tuyết Trinh ",
    rating: 5,
    comment: "Mình rất thích sốt chấm gà phô mai của quán.",
    profileImage:profile1,
  },
  {
    customerName: "Nguyễn Trọng Hữu",
    rating: 4,
    comment: "Giao hàng nhanh chóng, giá ở đây khá rẻ. Tuy nhiên có một điểm trừ là chỉ có 1 chi nhánh",
    profileImage:profile3,
  },
  {
    customerName: "Bé Na",
    rating: 5,
    comment: "Ngon",
    profileImage:profile2,
  },
];

class CarouselSkeleton extends Component {
  render() {
    return (
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <Skeleton height={200} color="#f4f4f4" highlightColor="#e0e0e0" />
          </div>
        ))}
      </Carousel>
    );
  }
}

 return (
      <div className="home-container">
        {loading ? (
          <CarouselSkeleton />
        ) : (
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            <div>
              <img src={hinhslide1} alt="Slide 1" className="carousel-image" />
            </div>
            <div>
              <img src={hinhslide2} alt="Slide 2" className="carousel-image" />
            </div>
            <div>
              <img src={hinhslide3} alt="Slide 3" className="carousel-image" />
            </div>
          </Carousel>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section">
            <Element name="newProducts">
              {this.renderSectionTitle("SẢN PHẨM MỚI")}
            </Element>
            {loading ? (
              this.renderProductList([])
            ) : (
              <Card.Group
                itemsPerRow={3}
                centered
                stackable
                className="product-list"
              >
                {this.renderProductList(newprods)}
              </Card.Group>
            )}
          </div>
        </motion.div>

        {hotprods.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section">
              <Element name="hotProducts">
                {this.renderSectionTitle("SẢN PHẨM HOT")}
              </Element>
              <Card.Group
                itemsPerRow={3}
                centered
                stackable
                className="product-list"
              >
                {this.renderProductList(hotprods)}
              </Card.Group>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section reviews-section">
            <Element name="customerReviews">
              {this.renderSectionTitle("ĐÁNH GIÁ TỪ KHÁCH HÀNG")}
            </Element>
            {this.renderReviews(reviews)}
          </div>
        </motion.div>

        <div className="customer-support">
          <Icon name="chat" size="big" />
        </div>
        
        <div className="scroll-links">
          <Link
            activeClass="active"
            to="newProducts"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Sản phẩm mới
          </Link>
          <Link
            activeClass="active"
            to="hotProducts"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Sản phẩm hot
          </Link>
          <Link
            activeClass="active"
            to="customerReviews"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Đánh giá từ khách hàng
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;