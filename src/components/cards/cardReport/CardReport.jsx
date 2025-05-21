import { CiFileOn } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FiDownload, FiTrash2 } from "react-icons/fi";

function CardReport({
  id,
  item,
  isMenuOpen,
  onMenuOpen,
  onDownload,
  onDelete,
}) {
  return (
    <div
      key={id}
      className="flex items-center justify-between border border-pink-zero px-4 py-3 rounded-md bg-white/5 relative"
    >
      <div className="flex items-center gap-2">
        <CiFileOn size={"30px"} />
        <span>{item}</span>
      </div>
      <div className="relative">
        <button
          className="text-white hover:text-pink-zero transition rounded-full border border-white/20 p-1 hover:border-pink-zero cursor-pointer"
          onClick={onMenuOpen}
        >
          <IoMdMore size={"20px"} />
        </button>
        {isMenuOpen && (
          <div
            className="absolute z-20 w-36 bg-zinc-900 border border-white/20 rounded-md shadow-lg flex flex-col"
            style={{
              top: "50%",
              left: "calc(100% + 12px)",
              transform: "translateY(-50%)",
            }}
          >
            <button
              className="flex items-center gap-2 px-4 py-2 hover:bg-pink-zero/20 text-white text-sm"
              onClick={onDownload}
            >
              <FiDownload /> Baixar
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 hover:bg-pink-zero/20 text-red-400 text-sm"
              onClick={onDelete}
            >
              <FiTrash2 /> Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardReport;
