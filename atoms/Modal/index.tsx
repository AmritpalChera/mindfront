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
  setIsOpen: (e: number) => void,
  styles?: any
}

function BaseModal({parentElement, children, isOpen, setIsOpen, styles}: BaseModalProps) {
  function closeModal() {
    setIsOpen(-1);
  }

  useEffect(() => {
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    if (parentElement) Modal.setAppElement(parentElement);
  }, [parentElement]);

  const appliedStyles = {
    content: {
      ...customStyles.content,
      ...styles
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={appliedStyles}
        contentLabel="Example Modal"
      >
       {children}
      </Modal>
    </div>
  );
}

export default BaseModal;