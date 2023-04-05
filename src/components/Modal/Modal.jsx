import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if ((e.currentTarget === e.target)) {
      this.props.onClose();
    }
  };

  render() {
    const {
      currentImage: { src },
      search,
    } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={src} alt={search} width="700" />
          <button
            type="button"
            className={css.ModalCloseBtn}
            onClick={this.props.onClose}
          />
          {/* {this.props.children} */}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  search: PropTypes.string.isRequired,
  // onClose: PropTypes.func,
  currentImage: PropTypes.shape({ src: PropTypes.string }).isRequired,
};
