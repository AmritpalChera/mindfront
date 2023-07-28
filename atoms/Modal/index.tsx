import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '0',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface BaseModalProps {
  parentElement: React.ReactNode,
  children: React.ReactNode,
  isOpen: boolean,
  setIsOpen: (e: number) => void
}

function BaseModal({parentElement, children, isOpen, setIsOpen}: BaseModalProps) {
  function closeModal() {
    setIsOpen(-1);
  }

  useEffect(() => {
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    if (parentElement) Modal.setAppElement(parentElement);
  }, [parentElement]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       {children}
      </Modal>
    </div>
  );
}

export default BaseModal;