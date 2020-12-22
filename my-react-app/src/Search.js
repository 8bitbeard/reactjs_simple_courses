import React from 'react';

const Search = ({value, onSearch}) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={onSearch}/>
    </div>
  )
};

export default Search;