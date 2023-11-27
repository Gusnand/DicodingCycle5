import axios from "axios";

class DataSource {
  static searchMovie(keyword) {
    const apiKey = "b9f315851a7637c2e22868c2c7a96d89"; // Replace with your Movie Database API key
    const baseUrl = "https://api.themoviedb.org/3/search/movie";

    const params = {
      query: keyword,
      api_key: apiKey,
    };

    return axios
      .get(baseUrl, { params })
      .then((response) => {
        if (response.data.results) {
          return Promise.resolve(response.data.results);
        } else {
          return Promise.reject(`${keyword} is not found!`);
        }
      })
      .catch((error) => {
        return Promise.reject(`Failed to fetch data: ${error.message}`);
      });
  }
}

export default DataSource;
