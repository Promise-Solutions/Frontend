import PrimaryButton from "../buttons/PrimaryButton";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination flex">
      <button
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
        className="flex justify-center items-center w-auto h-8 px-4 py-2 bg-transparent border border-pink-zero text-pink-zero font-bold text-center cursor-pointer transition-all duration-100 hover:border-cyan-zero hover:text-cyan-zero"
      >
        <span className="w-full text-center">{"<"}</span>
      </button>
      <span className="px-2">
        {page} de {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
        className="flex justify-center items-center w-auto h-8 px-4 py-2 bg-transparent border border-pink-zero text-pink-zero font-bold text-center cursor-pointer transition-all duration-100 hover:border-cyan-zero hover:text-cyan-zero"
      >
        <span className="w-full text-center">{">"}</span>
      </button>
    </div>
  );
};

export default Pagination;
