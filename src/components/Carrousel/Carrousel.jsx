import React from 'react';

import './carrousel.css';

const Carrousel = () => {
  return (
    <>
      <div className='slider'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div style={{
        backgroundColor: 'black',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        bottom: '0',
        opacity: '0.40',
        zIndex: '1'
      }}></div>
    </>
  )
}

export default Carrousel;
