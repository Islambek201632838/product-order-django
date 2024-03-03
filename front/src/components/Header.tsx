import { NavLink } from 'react-router-dom';
import { List, ListItem } from '@mui/material';

const Header = () => {
  // Define styles using the sx prop format
  const navLinkStyle = {
    margin: '0px',
    textDecoration: 'none',
    color: 'black', // Set your desired color
    '&.active': {
      fontWeight: 'bold',
    },
  };

  return (
    <nav style={{ width: '800px' }}>
      <List
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          listStyle: 'none',
        }}
      >
        <ListItem disablePadding><NavLink to="/" style={navLinkStyle}>Table</NavLink></ListItem>
        <ListItem disablePadding><NavLink to="/productForm" style={navLinkStyle}>Product Form</NavLink></ListItem>
        <ListItem disablePadding><NavLink to="/orderForm" style={navLinkStyle}>OrderForm</NavLink></ListItem>
        <ListItem disablePadding><NavLink to="/productInOrderForm" style={navLinkStyle}>Product In Order Form</NavLink></ListItem>
      </List>
    </nav>
  );
};

export default Header;
