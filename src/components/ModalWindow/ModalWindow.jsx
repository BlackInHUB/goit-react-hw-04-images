import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, Modal, ModalImg } from "./ModalWindow.styled";

const modalRoot = document.querySelector('#modal-root')

export default function ModalWindow({large, onClose}) {
    
    useEffect(() => {
        const handleEscDown = e => {
            if (e.key === 'Escape') {
                onClose();
                }
            }  

        window.addEventListener('keydown', handleEscDown)
        document.body.style.overflow = 'hidden'

        return () => {
            window.removeEventListener('keydown', handleEscDown)
            document.body.style.overflow = 'unset'
        }
    }, [onClose])      

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
        // if (e.target.nodeName === 'DIV' ) {
        //     onClose()
        // }
    }

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
        <Modal>
            <ModalImg src={large} />
        </Modal>
    </Overlay>,
    modalRoot,
    )
}

ModalWindow.propTypes = {
    large: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}