import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";

import "./navbar.css";

import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';


const Navbar = () => {
  const [locale, setLocale] = useState('FR');  
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  
  useEffect(() => {
    if (!localStorage.getItem('locale')) {
      const browserLocale = navigator.language?.split('-')[0];
      const currentLocale = browserLocale === 'fr' ? localStorage.setItem('locale', 'FR') : localStorage.setItem('locale', 'EN');
      setLocale(currentLocale);
    } else {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocale = (newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    navigate(`/${newLocale}/${window.location.pathname.split('/').splice(2).join('/')}`);
  }
 
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main-navigation"
    > 
      <div className="container">
        <div className="navbar-mobile">
          <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon  />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
              <Link className="navbar-item" to={`/${locale}`}>
                Accueil
              </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/products`}>
              Nos chambres
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/blog`}>
              Tarifs
            </Link>
          </MenuItem>
          <MenuItem>
          <Link className="navbar-item" to={`/${locale}/contact`}>
              Contact
            </Link>
          </MenuItem>
        </Menu>
        </div>
        <ul className="navbar-desktop">
            {/* TODO: inline override of padding is a result of refactoring
                to a ul for accessibilty purposes, would like to see a css
                re-write that makes this unneccesary.
             */}
            <li className="navbar-item" style={{padding: "0px"}}>
              <Link className="navbar-item" to={`/${locale}/about`}>
                Accueil
              </Link>
            </li>
            <li className="navbar-item" style={{padding: "0px"}}>
              <Link className="navbar-item" to={`/${locale}/products`}>
                Nos chambres
              </Link>
            </li>
            <li className="navbar-item" style={{padding: "0px"}}>
              <Link className="navbar-item" to={`/${locale}/blog`}>
                Tarifs
              </Link>
            </li>
            <li className="navbar-item" style={{padding: "0px"}}>
              <Link className="navbar-item" to={`/${locale}/contact`}>
                Contacts
              </Link>
            </li>
            <li className="navbar-item" style={{padding: "0px"}}>
              <Link className="navbar-item" to={`/${locale}/contact/examples`}>
                Form Examples
              </Link>
            </li>
            <li className="navbar-item" style={{padding: "0px"}}>
              <button onClick={() => locale === 'FR' ? handleLocale('EN'): handleLocale('FR')}>locale</button> 
              {locale}
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
