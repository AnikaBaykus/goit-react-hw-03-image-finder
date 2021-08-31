import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ hits, onClickImage }) {
  // console.log(hits);
  return (
    <ul className={s.ImageGallery}>
      {hits.map(({ webformatURL, tags, largeImageURL }, i) => (
        <ImageGalleryItem
          key={i}
          webformatURL={webformatURL}
          tags={tags}
          onClickImage={onClickImage}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  onClickImage: PropTypes.func,
};
export default ImageGallery;
