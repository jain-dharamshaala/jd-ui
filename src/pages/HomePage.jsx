import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import HotelIcon from "@mui/icons-material/Hotel";
import { DaharmshaalaListingCard } from "../components/DharamshaalaListingCard";

function HomePage() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [dharamshaalas, setDharamshaalas] = useState([]);

  const fetchCities = async (input) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/dharamshaalas/cities",
        {
          params: {
            input: input,
          },
        }
      );
      setCities(response.data);
    } catch (error) {
      console.log("Fetch cities failed", error);
      // Show error message
    }
  };

  useEffect(() => {
    fetchCities(city);
  }, [city]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/dharamshaalas/search",
        {
          params: {
            city: city,
            checkinDate: checkInDate,
            checkoutDate: checkOutDate,
          },
        }
      );
      let imageGetURL = "http://localhost:9000/api/images/";
      const dharamshaalasWithImages = await Promise.all(
        response.data.map(async (dharamshaala) => {
          const imageResponse = await axios.get(
            //imageGetURL + dharamshaala.images[0],
            imageGetURL + 'test.jpeg',
            { responseType: "arraybuffer" }
          );
          const base64Image = btoa(
            new Uint8Array(imageResponse.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { ...dharamshaala, base64Image };
        })
      );
      setDharamshaalas(dharamshaalasWithImages);
    } catch (error) {
      console.log("Search failed", error);
      // Show error message
    }
  };

  return (
    <div className="">
      <div className="grid p-4 m-2">
        <h1 className="mb-4 text-4xl font-bold">
          Jai Jinendra <HotelIcon />{" "}
        </h1>
        <div className="grid grid-cols-4">
          <div className="mr-2.5">
            <Select
              className="border border-gray-300"
              options={cities.map((city) => ({
                value: city,
                label: city,
              }))}
              onChange={(selectedOption) => setCity(selectedOption.value)}
            />
          </div>
          <div className="mr-2.5">
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="h-10 px-2 py-1 border border-gray-300 rounded mr-2.5"
            />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="h-10 px-2 py-1 border border-gray-300 rounded mr-2.5"
            />
            <button
              onClick={handleSearch}
              className="px-2 py-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
          </div >
          <div></div>
          <div></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {dharamshaalas.map((dharamshaala, index) => (
            <Link
              key={index}
              to={{
                pathname: `/dharamshaala/${dharamshaala._id}`,
                state: { checkInDate, checkOutDate },
              }}
            >
              <DaharmshaalaListingCard dharamshaala={dharamshaala} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
