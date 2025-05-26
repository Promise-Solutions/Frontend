import { CiFileOn } from "react-icons/ci";
import { FiDownload, FiTrash2 } from "react-icons/fi";

function CardReport({ id, item, onDownload, onDelete }) {
  return (
    <div
      key={id}
      className="flex items-center justify-between border border-pink-zero px-4 py-3 rounded-md bg-white/5 relative"
    >
      <div className="flex items-center gap-2">
        <CiFileOn size={"30px"} />
        <span>{item}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 px-3 py-2 rounded-md text-white hover:text-pink-zero border border-white/20 hover:border-pink-zero transition text-sm"
          onClick={onDownload}
          title="Baixar"
        >
          <FiDownload /> Baixar
        </button>
        <button
          className="flex items-center gap-1 px-3 py-2 rounded-md text-red-400 hover:text-white border border-white/20 hover:border-pink-zero transition text-sm"
          onClick={onDelete}
          title="Excluir"
        >
          <FiTrash2 /> Excluir
        </button>
      </div>
    </div>
  );
}

export default CardReport;
