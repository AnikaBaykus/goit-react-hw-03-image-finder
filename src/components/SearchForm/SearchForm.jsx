import s from './SearchForm.module.css';

import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class SearchForm extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.warn('😰 Nothing found, please specify your request 😵');
      return;
    }
    this.props.onSearchFormSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.imageName}
          onChange={this.handleNameChange}
        />
      </form>
    );
  }
}
