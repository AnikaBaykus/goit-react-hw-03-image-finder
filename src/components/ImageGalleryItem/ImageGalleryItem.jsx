import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onClickImage,
}) {
  console.log();
  return (
    <li key={id} className={s.ImageGalleryItem} onClick={onClickImage}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        longdesc={largeImageURL}
      />
    </li>
  );
}
export default ImageGalleryItem;
