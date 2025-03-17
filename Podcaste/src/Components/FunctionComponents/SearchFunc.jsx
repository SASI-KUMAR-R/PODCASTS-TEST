import React, { useState } from "react";
import data from "../JSON/DetailApi.json";

function SearchFunc() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="Search Container">
        <div className="SearchInput">
          <input
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div>
          {data
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
              return null;
            })
            .map((val) => {
              return (
                <div key={val.id}>
                  <img src={val.img} alt="" />
                  <h2>{val.title}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SearchFunc;
