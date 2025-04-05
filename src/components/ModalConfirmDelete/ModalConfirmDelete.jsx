import DeleteButton from "../deleteButton/DeleteButton";
import CancelButton from "./cancelButton";

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-5">
      <div className="bg-[#1E1E1E98] border-1 border-[#9A3379] text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <CancelButton onClick={onClose} text="Cancelar"></CancelButton>
          <DeleteButton
            onClick={onConfirm}
            id="confirm-delete-button"
            text="Deletar"
          ></DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
