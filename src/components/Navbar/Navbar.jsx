import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import "./navbar.css";

import FrFlag from "../../img/FR.png";
import EnFlag from "../../img/EN.png";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';


const Navbar = () => {
  const [anchorLocaleSelect, setAnchorLocaleSelect] = useState(null);
  const [anchorMobileMenu, setAnchorMobileMenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [location, setLocation] = useState('');
  const [locale, setLocale] = useState('FR');

  const openMobileMenu = Boolean(anchorMobileMenu);
  const openLocaleMenu = Boolean(anchorLocaleSelect);

  const windowWidth = useMediaQuery('(min-width:1200px)');

  useEffect(() => {
    setIsDesktop(windowWidth);

    scrollFunction();
    document.body.addEventListener('scroll', scrollFunction);    

    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }

    if (window.location.pathname) {
      setLocation(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    setIsDesktop(windowWidth);
  }, [windowWidth]);


/** =====-_ Test _-===== */
  const [bcolor, setBcolor] = useState('transparent');
  const [tcolor, setTcolor] = useState("white");

  const scrollFunction = (e) => {
    if (window.location.pathname.split('/').reverse()[0] === 'about' && document.body.scrollTop < 80 && isDesktop) {
      return setBcolor("transparent") & setTcolor("white")
    } else {
      return setBcolor("whiteSmoke ") & setTcolor("inherit")
    }
  };   

  
/** =====-_ Test _-===== */

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
            <Link className="navbar-item" to={`/${locale}`}>
              {locale === 'FR' ? 'Accueil' : 'Home'}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/products`}>
              {locale === 'FR' ? 'Nos chambres' : 'Our rooms'}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navbar-item" to={`/${locale}/blog`}>
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
        {/* TODO: inline override of padding is a result of refactoring
              to a ul for accessibilty purposes, would like to see a css
              re-write that makes this unneccesary.
            */}
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/about`} selected={`/${locale}/about` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Accueil' : 'About'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/products`} selected={`/${locale}/products` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Nos chambres' : 'Our rooms'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/blog`} selected={`/${locale}/blog` === location} style={{ color: tcolor }}>
            {locale === 'FR' ? 'Tarifs' : 'Prices'}
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/contact`} selected={`/${locale}/contact` === location} style={{ color: tcolor }}>
            Contacts
          </Link>
        </li>
        <li className="navbar-item" style={{ padding: "0px" }}>
          <Link className="navbar-item" to={`/${locale}/contact/examples`} selected={`/${locale}/contact/examples` === location} style={{ color: tcolor }}>
            Form Examples
          </Link>
        </li>
      </ul>
      <Button
        id="locale-button"
        aria-controls={openLocaleMenu ? 'locale-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openLocaleMenu ? 'true' : undefined}
        onClick={(event) => setAnchorLocaleSelect(event.currentTarget)}
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
        <MenuItem onClick={() => { setAnchorLocaleSelect(null); handleLocale('FR'); }}>
          <img className="nav-locale-flag" src={FrFlag} alt="fr-flag" />
        </MenuItem>
        <MenuItem onClick={() => { setAnchorLocaleSelect(null); handleLocale('EN'); }}>
          <img className="nav-locale-flag" src={EnFlag} alt="en-flag" />
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
