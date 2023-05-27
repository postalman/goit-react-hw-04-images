import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <StyledImageGalleryItem onClick={handleImageClick}>
        <StyledImageGalleryItemImage src={image.webformatURL} alt="" />
      </StyledImageGalleryItem>
      {showModal && (
        <Modal
          isOpen={showModal}
          largeImageURL={image.largeImageURL}
          onClose={handleCloseModal}
        />
      )}
    </React.Fragment>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
