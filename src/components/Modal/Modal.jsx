import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from 'components/Modal/Modal.styled';

const Modal = ({ onClose, isOpen, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <StyledOverlay onClick={handleOverlayClick}>
        <StyledModal>
          <img src={largeImageURL} alt="" />
        </StyledModal>
      </StyledOverlay>
    )
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
