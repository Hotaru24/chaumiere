import React, { useEffect, useState }  from "react";
import { Link } from "gatsby";
import "./footer.css";

import instagram from "../../img/social/instagram.svg";
import facebook from "../../img/social/facebook.svg";

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
        <div>
          <h1>LOGO</h1>
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
              <li>
                <Link to={ `/${locale}/contact`}>
                  Contacts & { locale === 'FR' ? 'Accès' : 'Access' }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="reservation">
          <button>{ locale === 'FR' ? 'Réserver' : 'Booking' }</button>
        </div>
        <div className="footer-social">
          <a title="facebook" href="https://facebook.com">
            <img
              src={facebook}
              alt="Facebook"
              style={{ width: "1em", height: "1em" }}
            />
          </a>
          <a title="instagram" href="https://instagram.com">
            <img
              src={instagram}
              alt="Instagram"
              style={{ width: "1em", height: "1em" }}
            />
          </a>
        </div>
      </div>
      <p>© {new Date().getFullYear()} La Chaumière - { locale === 'FR' ? ' Tous droits réservés' : 'All rights reserved' }</p>
    </footer>
  );
};

export default Footer;
