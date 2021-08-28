import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ hits, onClickImage }) {
  console.log(hits);

  return (
    <ul className={s.ImageGallery}>
      {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClickImage={onClickImage}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
}
export default ImageGallery;
