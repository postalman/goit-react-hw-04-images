import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <StyledImageGallery>
      {images.map(image => (
        <ImageGalleryItem key={image.webformatURL} image={image} />
      ))}
    </StyledImageGallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
