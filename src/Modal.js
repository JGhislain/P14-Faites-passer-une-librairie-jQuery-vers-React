import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className='cancel-button' onClick={onClose}>Annuler</button>
          <button className='ok-button' onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Modal;
