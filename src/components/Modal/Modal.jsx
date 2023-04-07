import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, currentImage: { src }, search }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={src} alt={search} width="700" />
        <button
          type="button"
          className={css.ModalCloseBtn}
          onClick={closeModal}
        />
        {/* {children} */}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  search: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  currentImage: PropTypes.shape({ src: PropTypes.string }).isRequired,
};
