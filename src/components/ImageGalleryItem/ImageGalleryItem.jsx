import { useState } from "react";
import PropTypes from 'prop-types'
import { GalleryItem, GalleryItemImg } from "./ImageGalleryItem.styled";
import ModalWindow from "components/ModalWindow/ModalWindow";

export default function ImageGalleryItem({web, large}) {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)   
    }
        
    return (
        <GalleryItem onClick={openModal}>
            <GalleryItemImg src={web} loading="lazy" />
            {isOpen && <ModalWindow large={large} onClose={closeModal} />}
        </GalleryItem>
    )

}

ImageGalleryItem.propTypes = {
    web: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired
}