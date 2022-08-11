import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ isOpen, onClose, children }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '12px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '520px',
        },
    };
    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel="Minimal Modal Example"
            onRequestClose={onClose}
            style={customStyles}
            ariaHideApp={false}
        >
            {children}
        </ReactModal>
    )
}

export default Modal