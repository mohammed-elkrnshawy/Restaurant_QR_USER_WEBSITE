import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';

class CardItem extends React.Component {
  render() {
    return (
      <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
        <div className="list-card-image">
          {this.props.rating ? (
            <div className="star position-absolute text-white">
              <Badge variant="danger" className="bg-secondary">
                <Icofont icon="star" className="text-white" />{' '}
                {this.props.rating}
              </Badge>
            </div>
          ) : (
            ''
          )}

          <Link to={this.props.linkUrl}>
            <Image
              src={this.props.image}
              className={this.props.imageClass}
              alt={this.props.imageAlt}
              style={{ width: '100%', height: '25vh' }}
            />
          </Link>
        </div>
        <div className="p-3 position-relative">
          <div className="list-card-body">
            <h6 className="mb-1">
              <Link to={this.props.linkUrl} className="text-black">
                {this.props.title}
              </Link>
            </h6>
            {this.props.subTitle ? (
              <p className="text-gray mb-3">{this.props.subTitle}</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  offerText: PropTypes.string,
  offerColor: PropTypes.string,
  subTitle: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  favIcoIconColor: PropTypes.string,
  rating: PropTypes.string,
};
CardItem.defaultProps = {
  imageAlt: '',
  imageClass: '',
  offerText: '',
  offerColor: 'success',
  subTitle: '',
  time: '',
  price: '',
  showPromoted: false,
  promotedVariant: 'dark',
  favIcoIconColor: '',
  rating: '',
};

export default CardItem;
