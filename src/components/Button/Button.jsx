import s from './Button.module.css';

function Button({ onLoadMore }) {
  return (
    <button type="button" className={s.Button} onClick={onLoadMore}>
      Load more
    </button>
  );
}
export default Button;
