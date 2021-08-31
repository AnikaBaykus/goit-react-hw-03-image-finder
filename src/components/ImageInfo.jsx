import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import LoaderMy from './Loader/LoaderMy';
import { toast } from 'react-toastify';
import Button from './Button';
import imageAPI from '../services/image-api.js';
import Modal from './Modal/Modal.jsx';

export default class ImageInfo extends Component {
  state = {
    hits: [],
    error: null,
    status: 'idle',
    showModal: false,
    alt: '',
    src: '',
    page: 1,
    isLoading: '',
    imageName: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.imageName;
    const nextImage = this.props.imageName;
    if (prevImage !== nextImage) {
      this.setState({ hits: [], page: 1, status: 'pending' });
      this.fetchImg();
    }
  }

  fetchImg = () => {
    const { page, isLoading, hits } = this.state;
    const { imageName } = this.props;
    console.log(page, imageName, hits, isLoading);

    if (!imageName) {
      return;
    }

    this.setState({ isLoading: true });
    console.log(isLoading);

    imageAPI
      .fetchImage(imageName, page)
      .then(({ hits }) => {
        this.setState((prevProps, prevState) => ({
          hits: [...prevProps.hits, ...hits],
          status: 'resolve',
          page: prevProps.page + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openImage = event => {
    const altImage = event.target.alt;
    const srcImage = event.target.longDesc;
    this.setState({ alt: altImage });
    this.setState({ src: srcImage });
    this.toggleModal();
  };

  render() {
    const { hits, error, status, src, alt, showModal, isLoading } = this.state;
    const { openImage, fetchImg, toggleModal } = this;

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
          {isLoading === true && <LoaderMy />}

          {hits.length !== 0 && <Button onLoadMore={fetchImg} />}
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
