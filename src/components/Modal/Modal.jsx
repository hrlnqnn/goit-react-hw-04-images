import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#root');

export const Modal = ({ image, onToggleModal }) => {
    const closeModal = (e) => {
        if (e.code === 'Escape') onToggleModal();
    };

    useEffect(() => {
        const closeModal = (e) => {
            if (e.code === "Escape") {
                onToggleModal();
            }
        };

        window.addEventListener("keydown", closeModal);

        return () => window.removeEventListener("keydown", closeModal);
    }, [onToggleModal]);
};

const handleClick = (e) => {
    if (e.target === e.currentTarget) {
        onToggleModal();
    }

    const handleClickModal = (e) => {
        if (e.target === e.currentTarget) onToggleModal();
    }

    return createPortal(
        <div className={css.overlay} onClick={handleClickModal}>
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
