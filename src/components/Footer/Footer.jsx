import React, { useEffect, useState }  from "react";
import { Link } from "gatsby";

import "./footer.css";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import instagram from "../../img/social/instagram.svg";
import facebook from "../../img/social/facebook.svg";
import logo from '../../img/logo.png';


const theme = createTheme({
  palette: {
    gold: {
      main: '#f2cd68',
      darker: '#f2cd68',
    },
  },
});

const Footer = () => {
  const [locale, setLocale] = useState('FR');

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);
  
  return (
    <footer>
      <div className="footer-body">
        <div className="footer-logo">
          <img
            src={logo}
            alt="logo"
          />
          <div className="logo-line"></div>
            <span>La chaumière</span>
          <div className="logo-subtitle">
            <div className="logo-line"></div>
              <span>Sainte Alvère</span>
            <div className="logo-line"></div>
          </div>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={ `/${locale}/home` }>
                  { locale === 'FR' ? 'Accueil' : 'Home' }
                </Link>
              </li>
              <li>
                <Link to={ `/${locale}/rooms` }>
                  { locale === 'FR' ? 'Gite & Chambres' : 'Accommodation' }
                </Link>
              </li>
              <li>
                <Link to={ `/${locale}/prestation` }>
                  Services & { locale === 'FR' ? ' Activités' : 'Avtivities' }
                </Link>
              </li>
              <li>
                <Link to={ `/${locale}/prices` }>
                  { locale === 'FR' ? 'Tarifs' : 'Prices' }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-end">
          <div className="footer-reservation">
            <ThemeProvider theme={theme}>
              <a 
                href="https://reservation.elloha.com/?IdPublication=046be7c8-8f62-4f49-81bc-893c382d67ea&culture=fr-FR&idoi=f6289d3b-e380-4b54-9675-b9db9b7d0c32&searchFirstAvailableDates=1"
                target="_blank"
              >
                <Button color="gold" variant="outlined">{ locale === 'FR' ? 'Disponibilités et Réservation' : 'Booking' }</Button>                
              </a>
            </ThemeProvider>
          </div>
          <div className="footer-contact">
            <Link to={ `/${locale}/contact`}>
              Contacts & { locale === 'FR' ? 'Accès' : 'Access' }
            </Link>
            <div className="footer-social">
              <a
                title="facebook"
                href="https://www.facebook.com/profile.php?id=100091547882089"
                target="_blank"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                />
              </a>
              <a
                title="instagram"
                href="https://www.instagram.com/la.chaumiere.sainte.alvere/"
                target="_blank"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="footer-legal">© {new Date().getFullYear()} La Chaumière - { locale === 'FR' ? ' Tous droits réservés' : 'All rights reserved' }</p>
    </footer>
  );
};

export default Footer;
