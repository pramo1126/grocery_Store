import { useState } from 'react';
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
// import AdminNavbar from '../components/AdminNavbar';

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);
    const [openProductCategories, setOpenProductCategories] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

    const handleClickProductCategories = () => {
        setOpenProductCategories(!openProductCategories);
    };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <br></br><br></br><br></br>
              <ListItem button onClick={handleClickProductCategories}>
                  <ListItemText primary="Product Categories" />
                  {openProductCategories ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openProductCategories} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary="Biscuits & Snacks" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary="Beverages" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary="Pasta & Cereals" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary="Frozen Foods" />
                      </ListItemButton>
                  </List>
              </Collapse>
              <Divider/>
              <br></br> 
              {[ 'Orders', 'Purchases', 'Profile'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
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
      
        <Button onClick={toggleDrawer(true)} style={{ marginLeft:'30px' }}>Menu</Button>
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



