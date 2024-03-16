import React, { useEffect, useState } from "react";

import { Link } from "gatsby";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import './carrouselButton.css';

const theme = createTheme({
  palette: {
    gold: {
      main: '#f2cd68',
      darker: '#f2cd68',
    },
  },
});

const CarrouselButton = () => {

  const images = [
    '/img/Drone-3.jpg',
    '/img/Drone-7.jpg',
    '/img/Piscine-2.jpg',
    '/img/Piscine-1.jpg',
    '/img/Piscine-nuit.jpg',
    '/img/Ext-11.jpg',
    '/img/Cour.jpg',
    '/img/IMG_1169.jpg',
    '/img/Sous-arbre-panorama.jpg',
    '/img/Sejour-1.jpg',
    '/img/Sejour-4.jpg',
    '/img/Entree-2.jpg',
    '/img/Cuisine-1.jpg',
    '/img/Desserte-etage-1.jpg',
    '/img/Chambre-1-2.jpg',
    '/img/Chambre-2-1.jpg',
    '/img/Chambre-2-2.jpg',
    '/img/Chambre-3-1.jpg',
    '/img/Chambre-gite-1.jpg',
    '/img/Sejour-gite-2.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [locale, setLocale] = useState('FR');

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <div className="slideshow">
        {images.map((image, index) => (
          <div
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${image})`,
              animationDelay: `${index * 5}s`,
            }}
          >
            <div className="gallery-link-container">
              <div className="carousel-gallery-link">
                <ThemeProvider theme={theme}>
                  <Link to={`/${locale}/gallery`}>
                    <Button variant="outlined" color="gold">
                      {locale === 'FR' ? 'Galerie' : 'Gallery'}
                    </Button>
                  </Link>
                </ThemeProvider>
              </div>              
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CarrouselButton;
