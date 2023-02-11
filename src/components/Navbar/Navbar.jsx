import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import "./navbar.css";

import FrFlag from "../../img/FR.png";
import EnFlag from "../../img/EN.png";

import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';


const Navbar = () => {
  const [location, setLocation] = useState('');
  const [locale, setLocale] = useState('FR');
  const [anchorMobileMenu, setAnchorMobileMenu] = useState(null);
  const [anchorLocaleSelect, setAnchorLocaleSelect] = useState(null);

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


/** =====-_ Test _-===== */
  const [bcolor, setBcolor] = useState('transparent');
  const [tcolor, setTcolor] = useState("white");
  const [underline, setUnderline] = useState("none");
  const [logoColor, setLogocolor] = useState("brightness(1.75)");

  const scrollFunction = (e) => {
    const isHome = window.location.pathname.split('/').reverse()[0];

    if (isHome === 'about' && document.body.scrollTop < 80) {
      return setBcolor("transparent") & setTcolor("white") & setUnderline("none") & setLogocolor("brightness(1.75)")
    } else {
      return setBcolor("whiteSmoke ") & setTcolor("inherit") & setUnderline("inset 0px 0px 0px white, inset 0px -2.5px 0 #388654") & setLogocolor("none")
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
