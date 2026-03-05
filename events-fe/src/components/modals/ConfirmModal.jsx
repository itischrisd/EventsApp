import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
};

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  const { t } = useTranslation();
  title = title || t("confirm-action");
  message = message || t("are-you-sure");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="modal-close-button fa-solid fa-xmark" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button className="button button-cancel" onClick={onClose}>
          { t("cancel") }
        </button>
        <button className="button button-confirm" onClick={onConfirm}>
          { t("confirm") }
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
