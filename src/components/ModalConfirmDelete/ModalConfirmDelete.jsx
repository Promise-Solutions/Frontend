import ConfirmButton from "../ConfirmButton/ConfirmButton";
import DeleteButton from "../DeleteButton/DeleteButton";

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#1E1E1E90] border-1 border-[#9A3379] text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
        <p className="mb-6">Tem certeza de que deseja deletar este usuário?</p>
        <div className="flex justify-end gap-4">
          <DeleteButton onClick={onClose} text="Cancelar"></DeleteButton>
          <ConfirmButton
            onClick={onConfirm}
            id="confirm-delete-button"
            text="Confirmar"
          ></ConfirmButton>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
