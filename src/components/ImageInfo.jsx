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

    if (prevImage !== nextImage) {
      this.setState({ status: 'pending', hits: null });

      imageAPI
        .fetchImage(nextImage)
        .then(({ hits }) => {
          this.setState({ hits, status: 'resolve' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
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

  render() {
    const { hits, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }
    if (status === 'pending') {
      return <LoaderMy />;
    }
    if (status === 'resolve') {
      return (
        <div>
          <ImageGallery hits={hits} onClickImage={this.openImage} />

          {hits.length !== 0 && <Button onLoadMore={this.componentDidUpdate} />}
          {this.state.showModal && (
            <Modal
              src={this.state.src}
              alt={this.state.src}
              onCloseModal={this.toggleModal}
            />
          )}
        </div>
      );
    }
    if (status === 'rejected') {
      return toast.error(error.message);
    }
  }
}
