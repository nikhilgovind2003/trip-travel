const Footer = () => {
  return (
    <footer className="bg-white p-4 mt-4 rounded-lg shadow-lg text-gray-700 w-full">
      {/* Subscribe Section */}
      <div className="bg-[#0A142F] rounded-lg shadow-lg text-white py-8 px-6 md:py-16 md:px-12 lg:px-20 xl:px-44">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-lg text-center md:text-left md:text-2xl font-semibold">
            Subscribe To Explore More
          </h2>
          <div className="flex flex-col sm:flex-row items-center w-full bg-white py-2 px-2 rounded-lg gap-2 sm:gap-0 md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-2 px-4 rounded-md sm:rounded-l-md sm:rounded-r-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto md:w-80"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-green-600">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
          <a href="#" className="hover:underline">
            About us
          </a>
          <a href="#" className="hover:underline">
            Discover
          </a>
          <a href="#" className="hover:underline">
            Explore
          </a>
          <a href="#" className="hover:underline">
            Hotels
          </a>
        </div>
        <div className="flex justify-center space-x-4 text-xl">
          <a href="#" aria-label="Facebook" className="hover:text-blue-600">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Vimeo" className="hover:text-blue-500">
            <i className="fab fa-vimeo"></i>
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-red-500">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 py-4 text-center text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mb-4 md:mb-0">© 2025 Lift Media. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <a href="terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="policy" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
