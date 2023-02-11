import React from 'react';

import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

import home1 from '../../public/img/home1.jpg';
import home2 from '../../public/img/home2.jpg';
import home3 from '../../public/img/home3.jpg';


const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '100vh'
}

const properties = {
  duration: 5000,
  autoplay: true,
  transitionDuration: 1500,
  arrows: false,
  infinite: true,
  easing: "ease",

};

const slideImages = [
  {
    url: home1,
  },
  {
    url: home2,
  },
  {
    url: home3,
  },
];


const Carrousel = () => {
  return (
    <div className="slide-container">
      <Fade {...properties}>
        {slideImages.map((slideImage, index)=> (
          <div key={index}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
            </div>
          </div>
        ))} 
      </Fade>
      <div style={{
        backgroundColor: 'black',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        bottom: '268px',
        opacity: '0.45',
        zIndex: '1'
      }}></div>
    </div>
  )
}

export default Carrousel;
