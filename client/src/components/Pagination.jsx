import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ setCurrentPage, totalPages, currentPage }) => {
  
  // Functions for navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (n) => {
    setCurrentPage(n);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      
      {/* Previous Page Button */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
        } transition-all duration-300 ease-in-out text-lg cursor-pointer border-2 p-2 rounded-full flex items-center justify-center`}
      >
        <FaArrowLeft />
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages).keys()].map((n) => (
        <div
          onClick={() => handleChange(n + 1)}  // Pages start at 1
          key={n}
          className={`${
            n + 1 === currentPage ? "bg-gray-500 text-white" : "bg-white"
          } transition-all duration-500 ease-in-out text-lg cursor-pointer border px-3 py-1 rounded-full hover:bg-gray-200`}
        >
          <span>{n + 1}</span>
        </div>
      ))}

      {/* Next Page Button */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
        } transition-all duration-300 ease-in-out text-lg cursor-pointer border-2 p-2 rounded-full flex items-center justify-center`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
