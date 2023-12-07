// Modal.js
import React from 'react';
import ReactModal from 'react-modal';
import "../index.css"



const Modal = ({ isOpen, onClose, pdfUrl }) => {
    const modalStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '100vh', // Adjust as needed
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom:'10px',
            alignItems: 'center',
            backgroundColor:'gray'
        },
      };
   
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="PDF Viewer Modal"
      ariaHideApp={false}
      style={modalStyles}
    >
      <button onClick={onClose}>Close</button>
      {pdfUrl && ( 
      <>
    
        <iframe
        title="PDF Viewer"
        src={ pdfUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}

      >
       
      </iframe>
      </>
      )}
    </ReactModal>
  );
};

// Function to convert ArrayBuffer to base64??? 
// function arrayBufferToBase64(buffer) {
//   let binary = '';
//   const bytes = new Uint8Array(buffer);
//   const len = bytes.byteLength;

//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }

//   return btoa(binary);
// }

export default Modal;
