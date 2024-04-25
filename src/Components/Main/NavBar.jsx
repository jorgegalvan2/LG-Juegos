import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import { Sidebar } from 'primereact/sidebar';
import ItemsCart from '../Cart/ItemsCart';
import ProductService from './../../services/ProductService.jsx'

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function PrimarySearchAppBar() {

  const [cartSidebar, setCartSidebar] = React.useState(null);
  const [menuSidebar, setMenuSidebar] = React.useState(null);

  const handleCartSidebarOpen = () => {
    setCartSidebar(true);
  };

  const handleCartSidebarHide = () => {
    setCartSidebar(false);
  };

  const handleMenuSidebarOpen = () => {
    setMenuSidebar(true);
  };

  const handleMenuSidebarHide = () => {
    setMenuSidebar(false);
  };




  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='BrandColor' position="fixed">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleMenuSidebarOpen}
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            LG Juegos Digitales
          </Typography>

                  <Autocomplete
                    id="free-solo-demo"
                    fullWidth={true}
                    options={ProductService.map((option) => `${option.name} - ${option.category}`)}
                    className='text-light my-2 stylesInputNavBar'
                    renderInput={(params) => <TextField {...params} label="Buscar..." />}
                  />
  
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleCartSidebarOpen}
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

    </Box>
    <Sidebar visible={cartSidebar} onHide={handleCartSidebarHide} blockScroll={true} header="Carro de compras" position="right">
        <ItemsCart />
    </Sidebar>
    <Sidebar visible={menuSidebar} onHide={handleMenuSidebarHide} blockScroll={true} header="LG Juegos Digitales" position="left">
      <ul className="list-group ulDecoration ">
        <li className='list-group-item '><Link className='text-dark' to="/">Inicio</Link></li>
        <li className='list-group-item'><Link className='text-dark' to="/">Playstation 3</Link></li>
        <li className='list-group-item'><Link className='text-dark' to="/">Playstation 4</Link></li>
        <li className='list-group-item'><Link className='text-dark' to="/">Playstation 5</Link></li>
        <li className='list-group-item'><Link className='text-dark' to="/">Ofertas</Link></li>
      </ul>
    
    </Sidebar>
    </>
    

    );
}

