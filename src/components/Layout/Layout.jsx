import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { withPrefix, navigate } from "gatsby";
import "./layout.css";

import useSiteMetadata from "../SiteMetadata";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [locale, setLocale] = useState('FR');

  useEffect(() => {
    if (!localStorage.getItem('locale')) {
      const browserLocale = navigator.language?.split('-')[0];
      browserLocale === 'fr' ? localStorage.setItem('locale', 'FR') : localStorage.setItem('locale', 'EN');
      setLocale(browserLocale.toUpperCase());
    }

    if (!window.location.pathname.includes('FR') && !window.location.pathname.includes('EN')) {
      navigate(`/${locale}/home`);
    }

  }, []);

  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default TemplateWrapper;
