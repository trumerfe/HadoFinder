import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import games from '../../assets/data/games.json'

const Search = (props) => {

  const handleOnSelect = (item) => {
    if (item.id){
      props.setGamesFilter(item.id)
    } else {
      const gameId = (games.filter((x) => x.name === item.toUpperCase()))
      props.setGamesFilter(gameId[0].id)
    }
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.name}
        </span>
      </>
    );
  };

  return (
    <div style={{width: 400, zIndex: 6, fontFamily: 'Roboto', fontSize: '1.4rem'}}>
      <ReactSearchAutocomplete
        items={games}
        onSearch={handleOnSelect}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
};

export default Search;
