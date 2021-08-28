import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { v4 as uuidv4 } from 'uuid';

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onClickImage }) {
  const imgId = uuidv4();
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
