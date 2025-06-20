import CancelButton from "../buttons/action/CancelButton.jsx";
import DeleteButton from "../buttons/action/DeleteButton.jsx";
import ReactDOM from "react-dom";

const ModalConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-40">
      <div className="bg-[#1E1E1E98] border-1 border-[#9A3379] text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <CancelButton onClick={onClose} text="Cancelar" />
          <DeleteButton
            onClick={onConfirm}
            id="confirm-delete-button"
            text="Deletar"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalConfirmDelete;
