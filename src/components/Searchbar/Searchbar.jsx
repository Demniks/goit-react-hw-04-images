import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      toast.error('Search field must be filled');
      return;
    }
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FcSearch />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
            name="search"
            value={this.search}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
