import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#root');

export const Modal = ({ image, onToggleModal }) => {
    const closeModal = useCallback(
        e => {
            if (e.code === 'Escape' || e.target === e.currentTarget) onToggleModal();
        },
        [onToggleModal]
    );

    useEffect(() => {
        window.addEventListener('keydown', closeModal);

        return () => window.removeEventListener('keydown', closeModal);
    }, [closeModal]);

    return createPortal(
        <div className={css.overlay} onClick={closeModal}>
            <div className={css.modal}>
                <img src={image} alt="" />
            </div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    onToggleModal: PropTypes.func.isRequired,
};