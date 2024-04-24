import { Fragment, useState } from "react";
import type { Place } from "../api/Place";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await search(term);
    setPlaces(res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          id="term"
          onChange={(e) => setTerm(e.target.value)}
          type="text"
          value={term}
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 active:border-indigo-500 px-4 my-2 w-full"
        />
      </form>
      <h1 className="font-bold mt-6">Fount location</h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm">{place.name}</p>
              <button className="bg-blue-500 text-xs text-white font-bold py-1 px-1  rounded" onClick={()=>onPlaceClick(place)}>
                Go
              </button>
              <div className="border-b w-full col-span-2"/>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default LocationSearch;
