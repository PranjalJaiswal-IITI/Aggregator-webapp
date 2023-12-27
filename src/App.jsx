import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [query, setQuery] = useState('');
  const [news, setNews] = useState([]);
  const [sortBy, setSortBy] = useState('relevance'); 

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&apiKey=7d3e523bc27043eabb72b9e990c06c1e`
      );

      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="container">
      <h1>Aggregator Web App</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          className="search-input"
        />
        <div className="button">
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <div className="sort-container">
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange}>
            <option value="relevance">Relevance</option>
            <option value="publishedAt">Date</option>
            <option value="source">Source</option>
          </select>
        </div>
        </div>
        
      </div>
      <div>

        {news.map((article) => (
          <div key={article.url} className="card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="card-image" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



