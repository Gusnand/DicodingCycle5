import DataSource from "../data/data-source.js";
import $ from "jquery";
import "../component/movie-list.js";
import "../component/search-bar.js";

import "../../styles/style.scss";
import "bootstrap";

const main = () => {
  const searchElement = $("search-bar");
  const movieListElement = $("movie-list");

  const onButtonSearchClicked = () => {
    DataSource.searchMovie(searchElement.val())
      .then(renderResult)
      .catch(fallbackResult);
  };

  const renderResult = (results) => {
    movieListElement.get(0).movies = results;
  };

  const fallbackResult = (message) => {
    movieListElement.get(0).renderError(message);
  };

  searchElement.find("#searchButtonElement").click(onButtonSearchClicked);
};

export default main;
