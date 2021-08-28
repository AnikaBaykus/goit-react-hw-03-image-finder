import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Loader.module.css';
import Loader from 'react-loader-spinner';

const loaderRoot = document.querySelector('#loader-root');
export default class LoaderMy extends Component {
  render() {
    return createPortal(
      <div className={s.Loader}>
        <Loader
          className={s.Spinner}
          type="Rings"
          color="#3f51b5"
          height={100}
          width={100}
          timeout={5000} //3 secs
        />
      </div>,
      loaderRoot,
    );
  }
}
