import React, { useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import cors from 'cors';
import games from '../../assets/data/games.json';
import test from '../../assets/data/new.json'

const Search = (props) => {

  const handleOnSelect = (item) => {
    // console.log('test')
    if (item.id){
      props.setGamesFilter(item.id)
    } else {
      const gameId = (test.filter((x) => x.name === item.toUpperCase()))
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
        items={test}
        onSearch={handleOnSelect}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
};

export default Search;
