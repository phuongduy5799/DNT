import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Button,
  Input,
  Text,
  Spacer,
  Navbar,
} from '@nextui-org/react';
import { FaSearch, FaHome } from 'react-icons/fa';
import './Menu.css';

const MenuComponent = () => {
  const [categories, setCategories] = useState([]);
  const [txtKeyword, setTxtKeyword] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apiGetCategories();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const menuContainer = document.querySelector('.menu-container');
    const menuNavbar = document.querySelector('.menu-navbar');
    if (menuContainer && menuNavbar) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        menuContainer.classList.add('fixed-menu');
      } else {
        menuContainer.classList.remove('fixed-menu');
      }
    }
  };

  const apiGetCategories = () => {
    axios.get('http://localhost:4000/api/customer/categories').then((res) => {
      const result = res.data;
      setCategories(result);
    });
  };

  const btnSearchClick = (e) => {
    e.preventDefault();
    navigate('/product/search/' + txtKeyword);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    navigate('/product/category/' + categoryId);
  };

  return (
    <div className="menu-container">
      <Navbar className="menu-navbar">
        <Container>
          <Grid.Container alignItems="center" gap={1}>
          <Grid> 
  <Text h3>
    <a
      href="/"
      className="home-link"
      onClick={(e) => { 
        e.preventDefault(); 
        navigate('/');
        setSelectedCategoryId(''); // Clear the selected category
      }}
    >
      <FaHome />Home
    </a>
  </Text>
</Grid>
            <Spacer x={1.5} />
            {categories.map((item) => (
              <Grid key={item._id}>
                <Text
  h4
  className={selectedCategoryId === item._id ? 'selected-category selected-category-3d' : ''}
  onClick={() => handleCategoryClick(item._id)}
>
  <a href={`/product/category/${item._id}`} onClick={(e) => e.preventDefault()}>{item.name}</a>
</Text>
                <Spacer x={1.5} />
              </Grid>
            ))}
            <form onSubmit={btnSearchClick} className="search">
              <Grid.Container justify="center" gap={1} alignItems="center">
                <Grid>
                  <Input
                    icon={<FaSearch />}
                    type="search"
                    placeholder="Nhập từ khóa"
                    value={txtKeyword}
                    onChange={(e) => setTxtKeyword(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <Button type="submit" color="primary" auto>
                    Tìm kiếm
                  </Button>
                </Grid>
              </Grid.Container>
            </form>
          </Grid.Container>
        </Container>
      </Navbar>
    </div>
  );
};

export default MenuComponent;