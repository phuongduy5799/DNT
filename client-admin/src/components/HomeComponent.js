import React from "react";
import { Container, Grid, Header, Button, Icon, Divider } from "semantic-ui-react";
import "./Home.css";


const Home = () => {
  const handleButtonClick = () => {
    // Xử lý khi nút được nhấp
    alert("Bạn đã nhấp vào nút!");
  };

  return (
    <Container textAlign="center" className="home-container">
      <Grid centered stackable columns={2}>
        <Grid.Column>
          <Header as="h2" className="home-header" textAlign="center">
            TRANG CHỦ QUẢN TRỊ
          </Header>
        </Grid.Column>
        <Grid.Column>
          {/* <Header as="h3" className="home-subheader">
            Chào mừng đến với Bảng điều khiển Quản trị
          </Header>
          <p className="home-description">
            Đây là nơi bạn có thể quản lý và điều hành các chức năng và tính
            năng của trang web. Từ đây, bạn có thể quản lý người dùng, thêm,
            sửa đổi hoặc xóa nội dung, và thực hiện các tác vụ quản trị khác.
          </p> */}
          {/* <Button primary size="large" className="home-button" onClick={handleButtonClick}>
            <Icon name="users" />
            Xem Người dùng
          </Button>
          <Divider horizontal>Hoặc</Divider>
          <Button secondary size="large" className="home-button">
            <Icon name="settings" />
            Cài đặt
          </Button> */}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Home;
