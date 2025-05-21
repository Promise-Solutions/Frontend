import { CiFileOn } from "react-icons/ci";

function CardReport({ id, item, onClick }) {
  return (
    <div
      key={id}
      className="flex items-center justify-between border border-pink-zero px-4 py-3 rounded-md bg-white/5"
    >
      <div className="flex items-center gap-2">
        <CiFileOn size={"30px"} />
        <span>{item}</span>
      </div>
      <button className="text-white hover:text-pink-zero transition rounded-full border border-white/20 p-1 hover:border-pink-zero">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={onClick}
        >
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>
    </div>
  );
}

export default CardReport;
