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
    <footer className="footer has-background-black has-text-white-ter">
      <div className="content has-text-centered has-background-black has-text-white-ter">
        <div className="container has-background-black has-text-white-ter">
          <div style={{ maxWidth: "100vw" }} className="columns">
            <div className="column is-4">
              <nav className="menu">
                <ul className="menu-list">
                  <li>
                    <Link className="navbar-item" to={`/${locale}/prestation`}>
                      {locale === 'FR' ? 'Accueil' : 'Home'}
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to={`/${locale}/rooms`}>
                      {locale === 'FR' ? 'Nos chambres' : 'Our rooms'}
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to={`/${locale}/prices`}>
                      {locale === 'FR' ? 'Tarifs' : 'Prices'}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="column is-4">
              <section>
                <ul className="menu-list">
                  <li>
                    <Link className="navbar-item" to="/rooms">
                      Latest Stories
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
            <div className="column is-4 social">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
