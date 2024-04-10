import React, { useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import cors from 'cors'
import games from '../../assets/data/games.json'

const Search = () => {

  // console.log(games)

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span> */}
        <span style={{ display: "block", textAlign: "left" }}>
          {item.name}
        </span>
      </>
    );
  };

  return (
    <div style={{width: 400, zIndex: 6}}>
      <ReactSearchAutocomplete
        items={games}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
};

export default Search;
