import axios from "axios";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

const HeroSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  console.log(results)
  const fetchData = async (value) => {
    console.log(value)
    try {
      const { data } =  await axios.get("http://localhost:4000/api/v1/places/get-all-places")
      const getData =  data.places.filter(place =>value !== '' && place.placeName.toLowerCase().includes(value))
      if (getData) {
        setResults(getData)
      }

    } catch (error) {
      console.log(error.message)
    }
  };



  const handleChange = (e) => {
    setQuery(e.target.value)
    fetchData(e.target.value)
    console.log(e.target.value)
  }


  return (
    <div className="absolute z-20 flex items-center justify-center gap-4 flex-col w-full top-0 text-white h-[75vh]">
      <h1 className="font-bold text-5xl">Where To Go?</h1>
      <p className="text-gray-300">Want To Explore New World</p>

      <form>
        <div className="rounded-full border-2 border-white flex gap-6 items-center px-4 py-2 justify-center">
          <IoSearch size={30}  />
          <input
            placeholder="Explore Destinations..."
            type="text"
            className="border-none outline-none bg-transparent w-[200px] lg:w-[400px] text-lg"
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>

      {/* {errors && <p className="text-red-500 mt-4">{errors}</p>} */}

      <div className="mt-6 lg:w-[490px] absolute lg:top-[360px] top-[360px] w-[290px] text-black rounded-xl flex flex-col bg-white  items-start">
        {results.length > 0 ? (
          results.map((result, index) => (
            <Link
              key={index}
              to={`/visit/${result._id}`}
              className=" border-b-2 w-full py-2 px-4 hover:bg-gray-200 transition duration-300 ease-out"
            >
              <h2 className="font-bold text-xl">{result.placeName}</h2>
            </Link>
          ))
        ) : (
          query && <p className="text-gray-400 px-8 my-4">No results found</p>
        )}
      </div>
    </div>
  );
};

export default HeroSearch;
