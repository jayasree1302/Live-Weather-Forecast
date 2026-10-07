import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a city..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="City name"
        autoComplete="off"
      />
      <button type="submit" className="search-btn" aria-label="Search">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
