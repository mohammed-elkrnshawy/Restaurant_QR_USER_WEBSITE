import React from 'react';
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from '../pages/Site/Home/ProductBox';

class CategoriesCarousel extends React.Component {
  render() {
    return (
      <OwlCarousel nav {...options} className="owl-carousel-category owl-theme">
        {this.props.categories.map((c) => (
          <div className="item">
            <ProductBox
              boxClass="osahan-category-item"
              title={c.name}
              image={c.image}
              imageClass="img-fluid"
              imageAlt="carousel"
              linkUrl="#"
            />
          </div>
        ))}
      </OwlCarousel>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 3,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 6,
    },
    1200: {
      items: 8,
    },
  },
  loop: true,
  lazyLoad: true,
  dots: false,
  autoplaySpeed: 1000,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='fas fa-chevron-left'></i>",
    "<i class='fas fa-chevron-right'></i>",
  ],
};

export default CategoriesCarousel;
