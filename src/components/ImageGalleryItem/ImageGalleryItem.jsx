import PropTypes from 'prop-types';
import css from './ImageGaleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  openModal,
  id,
  tags,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModal({ src: largeImageURL, alt: tags })}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        id={id}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};
