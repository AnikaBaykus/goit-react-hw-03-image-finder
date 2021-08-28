import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { uuid } from 'uuidv4';

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onClickImage }) {
  const imgId = uuid();
  return (
    <li key={imgId} className={s.ImageGalleryItem} onClick={onClickImage}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        longdesc={largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
