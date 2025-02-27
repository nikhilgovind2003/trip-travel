import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ setCurrentPage, totalPages, currentPage,  }) => {
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleChange = (n) => {
    setCurrentPage(n);
  };
  return (
    <div className=" text-center flex w-full mt-4 justify-center">
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className="hover:bg-gray-300 hover:border-white transition-all duration-300 ease-in-out text-lg cursor-pointer border-2 mx-1 px-1 rounded-full flex items-center justify-center"
      >
        <FaArrowLeft />
      </button>
      {[...Array(totalPages).keys()].map((n, index) => (
        <div
          onClick={() => handleChange(n)}
          key={index}
          className={` ${
            n === currentPage ? "bg-gray-500 text-white" : "bg-white"
          } transition-all duration-700 ease-in-out text-lg cursor-pointer border-2 mx-1 px-2 rounded-full`}
        >
          <span>{n+1}</span>
        </div>
      ))}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages - 1}
        className="hover:bg-gray-300 hover:border-white transition-all duration-300 ease-in-out text-lg cursor-pointer border-2 mx-1 px-1 rounded-full flex items-center justify-center"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
