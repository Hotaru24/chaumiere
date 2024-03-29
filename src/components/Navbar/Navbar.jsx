import React, { useEffect, useState } from "react";
import { globalHistory } from "@reach/router";
import { Link, navigate } from "gatsby";

import "./navbar.css";

import FrFlag from "../../img/FR.png";
import EnFlag from "../../img/EN.png";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

const theme = createTheme({
  palette: {
    gold: {
      main: '#f2cd68',
      darker: '#f2cd68',
    },
  },
});

const Navbar = () => {
  const [anchorLocaleSelect, setAnchorLocaleSelect] = useState(null);
  const [anchorMobileMenu, setAnchorMobileMenu] = useState(null);
  const [bcolor, setBcolor] = useState('transparent');
  const [tcolor, setTcolor] = useState("white");  
  const [location, setLocation] = useState('');
  const [locale, setLocale] = useState('FR');

  const openMobileMenu = Boolean(anchorMobileMenu);
  const openLocaleMenu = Boolean(anchorLocaleSelect);


  useEffect(() => {
    scrollFunction();
    document.body.addEventListener('scroll', scrollFunction);

    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }

    if (window.location.pathname) {
      setLocation(window.location.pathname);
    }
  }, []);

  const scrollFunction = () => {
    if (globalHistory.location.pathname.includes('home') && document.body.scrollTop < 80) {
      return setBcolor("transparent") & setTcolor("white");
    } else {
      return setBcolor("#14213D") & setTcolor("inherit");
    }
  };   

  const handleLocale = (locale) => {
    const newLocale = locale;

    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    navigate(`/${newLocale}/${window.location.pathname.split('/').splice(2).join('/')}`);
  }

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main-navigation"
      style={{
        backgroundColor : bcolor,
        transitionDuration: "1.5s",
      }}
    >
      <div className="navbar-mobile">
        <Button
          id="mobile-button"
          className="mobile-menu-button"
          aria-controls={openMobileMenu ? 'mobile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMobileMenu ? 'true' : undefined}
          onClick={(event) => setAnchorMobileMenu(event.currentTarget)}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="mobile-menu"
          anchorEl={anchorMobileMenu}
          open={openMobileMenu}
          onClose={() => setAnchorMobileMenu(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/home`}>
              {locale === 'FR' ? 'Accueil' : 'Home'}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/rooms`}>
              {locale === 'FR' ? 'Gite & Chambres' : 'Accommodation'}
            </Link>
          </MenuItem>  
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/gallery`}>
              {locale === 'FR' ? 'Galerie' : 'Gallery'}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/prestation`}>
              {locale === 'FR' ? 'Services & Activités' : 'Services & Activities'}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/prices`}>
              {locale === 'FR' ? 'Tarifs' : 'Prices'}
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
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/home`} selected={`/${locale}/home` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Accueil' : 'Home'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/rooms`} selected={`/${locale}/rooms` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Gite & Chambres' : 'Accommodation'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/gallery`} selected={`/${locale}/gallery` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Galerie' : 'Gallery'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/prestation`} selected={`/${locale}/prestation` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Services & Activités' : 'Services & Activities'}
          </Link>
        </li>        
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/prices`} selected={`/${locale}/prices` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Tarifs' : 'Prices'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/contact`} selected={`/${locale}/contact` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Contacts & Accès' : 'Contacts & Access'}
          </Link>
        </li>
      </ul>
      <div className="nav-booking">
        <ThemeProvider theme={theme}>
        <a 
          href="https://reservation.elloha.com/?IdPublication=046be7c8-8f62-4f49-81bc-893c382d67ea&culture=fr-FR&idoi=f6289d3b-e380-4b54-9675-b9db9b7d0c32&searchFirstAvailableDates=1"
          target="_blank"
        >
          <Button color="gold" variant="outlined">{ locale === 'FR' ? 'Réservation' : 'Booking' }</Button>
        </a>
        </ThemeProvider>
      </div>
      <Button
        id="locale-button"
        aria-controls={openLocaleMenu ? 'locale-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openLocaleMenu ? 'true' : undefined}
        onClick={ (event) => setAnchorLocaleSelect(event.currentTarget) }
      >
        <img className="nav-locale-flag" src={locale === 'FR' ? FrFlag : EnFlag} alt="locale-flag" />
      </Button>
      <Menu
        id="locale-menu"
        aria-labelledby="locale-button"
        anchorEl={anchorLocaleSelect}
        open={openLocaleMenu}
        onClose={() => setAnchorLocaleSelect(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={ () => { setAnchorLocaleSelect(null); handleLocale('FR'); }}>
          <img className="nav-locale-flag" src={FrFlag} alt="fr-flag" />
        </MenuItem>
        <MenuItem onClick={ () => { setAnchorLocaleSelect(null); handleLocale('EN'); }}>
          <img className="nav-locale-flag" src={EnFlag} alt="en-flag" />
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
