import React from 'react';
import { Carousel } from 'antd';

export default ({ images }) => {
  return (
    <Carousel autoplay={true} dots={true} className="TripPage__ImageCarousel">
      {images.map(image => <img key={image.displayOrder} className="TripPage__ImageCarousel__Image" src={image.url} alt="" />)}
    </Carousel>
  );
};
