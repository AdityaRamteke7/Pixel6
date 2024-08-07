import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import logo from './assest/Pixel6.png'
const Logo = styled('img')({
    height: '50px',
    marginRight: '16px',
});

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Toolbar>
                <Logo src={logo} alt="Pixel Logo" />
                <div style={{ flexGrow: 1 }} />
                <IconButton edge="end" color="inherit" aria-label="menu">
                    <MenuIcon style={{ color:"red"}} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
