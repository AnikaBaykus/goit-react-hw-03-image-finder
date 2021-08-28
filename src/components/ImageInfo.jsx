import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import LoaderMy from './Loader/LoaderMy';
import { toast } from 'react-toastify';
import Button from './Button';
import imageAPI from '../services/image-api.js';
import Modal from './Modal/Modal.jsx';

export default class ImageInfo extends Component {
  state = {
    hits: null,
    error: null,
    status: 'idle',
    showModal: false,
    alt: '',
    src: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.imageName;
    const nextImage = this.props.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage) {
      this.setState({ status: 'pending' });

      imageAPI
        .fetchImage(nextImage, prevPage)
        .then(({ hits }) => {
          this.setState({ hits, status: 'resolve' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ loaderStatus: true });
      imageAPI
        .fetchImage(nextImage, nextPage)
        .then(({ hits }) => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            status: 'resolve',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    console.log('клик');
  };

  openImage = event => {
    const altImage = event.target.alt;
    const srcImage = event.target.longDesc;
    this.setState({ alt: altImage });
    this.setState({ src: srcImage });
    this.toggleModal();
  };

  clickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { hits, error, status, src, alt, showModal } = this.state;
    const { openImage, clickLoadMore, toggleModal } = this;

    if (status === 'idle') {
      return <div></div>;
    }
    if (status === 'pending') {
      return <LoaderMy />;
    }
    if (status === 'resolve') {
      return (
        <div>
          <ImageGallery hits={hits} onClickImage={openImage} />

          {hits.length !== 0 && <Button onLoadMore={clickLoadMore} />}
          {showModal && (
            <Modal src={src} alt={alt} onCloseModal={toggleModal} />
          )}
        </div>
      );
    }
    if (status === 'rejected') {
      return toast.error(error.message);
    }
  }
}
