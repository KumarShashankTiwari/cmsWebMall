import { Modal } from 'react-bootstrap';
import './index.scss';

const Popup = (props) => {
  const {
    showPopup,
    togglePopupVisibility,
    onConfirmDeleteRow,
    title,
    yes,
    no,
  } = props;
  const Dom = (
    <Modal
      size='sm'
      show={showPopup}
      onHide={togglePopupVisibility}
      aria-labelledby='delete-popup'
      centered
    >
      <Modal.Header>
        <Modal.Title id='delete-popup' className='text-center w-100'>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center d-flex justify-content-around'>
        {yes && (
          <button
            className='btn-modal-yes'
            size='sm'
            onClick={onConfirmDeleteRow}
          >
            {yes}
          </button>
        )}

        <button
          className='btn-modal-no'
          variant='outline-secondary'
          size='sm'
          onClick={togglePopupVisibility}
        >
          {no}
        </button>
      </Modal.Body>
    </Modal>
  );
  return Dom;
};

export default Popup;
