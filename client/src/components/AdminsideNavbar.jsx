import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);
  const [openProductCategories, setOpenProductCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categoryRoutes/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleClickProductCategories = () => {
    setOpenProductCategories(!openProductCategories);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <br />
        <br />
        <br />
        <ListItem button onClick={handleClickProductCategories}>
          <ListItemText primary="Product Categories" />
          {openProductCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProductCategories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItemButton
                key={category.Category_ID}
                component={Link}
                to={`/admin/category/${category.Category_ID}`}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={category.Product_Category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <Divider />
        <br />
        {['Orders', 'Purchases', 'Profile'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', justifyContent: 'flex-end' }}>
        <Box sx={{ flex: '0 0 auto', display: 'flex' }}>
          <Button onClick={toggleDrawer(true)} style={{ marginLeft: '30px' }}>Menu</Button>
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Box>
      </Box>
    </div>
  );
};

export default TemporaryDrawer;
