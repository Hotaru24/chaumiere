import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";

import useSiteMetadata from "./SiteMetadata";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";


const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [locale, setLocale] = useState('FR'); 

  useEffect(() => {
    if (!localStorage.getItem('locale')) {
      const browserLocale = navigator.language?.split('-')[0];
      const currentLocale = browserLocale === 'fr' ? localStorage.setItem('locale', 'FR') : localStorage.setItem('locale', 'EN');
      setLocale(currentLocale);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <html lang={locale ? locale.toLowerCase() : 'fr'} />
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
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
