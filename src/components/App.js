import './App.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageInfo from './ImageInfo';

export class App extends Component {
  static defaultProps = {};
  state = {
    imageName: '',
  };

  handleSearchFormSubmit = data => {
    this.setState({ imageName: data.trim() });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSearchFormSubmit={this.handleSearchFormSubmit} />

        <ImageInfo imageName={this.state.imageName} />

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}

export default App;
