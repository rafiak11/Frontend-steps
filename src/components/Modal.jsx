import React from 'react';
// import './index.css'; // Import the CSS file for modal styling

const Modal = ({ showModal, handleClose, handleSubmit, handleChange, commentDetails }) => {
  if (!showModal) return null; // Don't render anything if showModal is false

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Submit Your Comment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={commentDetails.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="anonymous"
              checked={commentDetails.anonymous}
              onChange={handleChange}
            />
            Keep my comment anonymous
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
