import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Select, MenuItem, InputBase, Box, AppBar, Toolbar, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import MenuIcon from '@mui/icons-material/Menu';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryService from '../../CategoryAPI/CategoryService';
import { logout } from '../../AuthAPI/AuthService';

function Navbar({ onCategorySelect }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL CATEGORIES');

    useEffect(() => {
        CategoryService.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('There was an error fetching the categories!', error));
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        await logout(token);
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
        const category = categories.find(cat => cat.name === selectedCategory);
        if (category) {
            onCategorySelect(category);
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {categories.map((category, index) => (
                    <ListItem key={category.id} disablePadding onClick={() => onCategorySelect(category)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" padding="20px 60px" style={{ backgroundColor: "GrayText", color: "white" }}>
                <Grid item>
                    <Typography variant="h4">NAMMA</Typography>
                    <Typography variant="h4">MALIGAI.COM</Typography>
                    <Typography variant="h6">YOUR KITCHEN REFILLER</Typography>
                </Grid>
                <Grid item>
                    <Grid>
                        <Typography variant="h6" style={{ marginBottom: "20px" }}>
                            <AirportShuttleIcon style={{ marginRight: "12px", marginBottom: "-5px" }} />
                            FREE DELIVERY | 1 HOUR DELIVERY (7AM - 10PM)<br />ON ORDER ABOVE 5.00
                        </Typography>
                    </Grid>
                    <Grid container direction="column" alignItems="flex-end">
                        <Grid item>
                            <Typography variant="h6" style={{ marginBottom: "20px" }}>
                                <LocalPhoneIcon style={{ marginBottom: "-5px", marginRight: "12px" }} />
                                Phone Order - 9751 200 111 / 9751 300 111 / 9751 400 111
                            </Typography>
                        </Grid>
                        <Grid item style={{ backgroundColor: "#f5f5f5", color: "black", padding: "20px", width: "100%" }}>
                            <Typography>Product Search by Category</Typography>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                    <Select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        <MenuItem value="ALL CATEGORIES">ALL CATEGORIES</MenuItem>
                                        {categories.map(category => (
                                            <MenuItem key={category.id} value={category.name}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <InputBase
                                        sx={{ width: 379 }}
                                        style={{ border: "1px solid black" }}
                                        placeholder="Search..."
                                        inputProps={{ 'aria-label': 'search' }}
                                        id="search"
                                    />
                                </Grid>
                                <Grid item>
                                    <PersonIcon
                                        style={{ backgroundColor: "gray", width: "50px", height: "37px" }}
                                        variant="contained"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </PersonIcon>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "white", color: "black" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon style={{ backgroundColor: "orange", color: "white", width: "120%" }} />
                        </IconButton>
                        <Typography variant="h6" sx={{ backgroundColor: "black", color: "white", width: "10%", padding: "2px", height: "30px" }}>
                            CATEGORIES
                        </Typography>
                        <Grid container justifyContent="space-evenly">
                        <Grid item>
                            <Button>
                            <Link to="" style={{ textDecoration: "none", color: "black" }}>
                                    Home
                                </Link>
                                </Button>
                            </Grid>
                            <Button>
                                <Link to="/category" style={{ textDecoration: "none", color: "black" }}>
                                    Category
                                </Link>
                            </Button>
                            <Grid item>
                            <Button>
                                <Link to="/item" style={{ textDecoration: "none", color: "black" }}>
                                   Item
                                </Link>
                            </Button>
                            </Grid>
                        </Grid>
                     
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList()}
            </Drawer>
        </div>
    );
}

export default Navbar;
