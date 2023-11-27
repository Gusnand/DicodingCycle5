class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
        <img class="image-movie" src="http://image.tmdb.org/t/p/w500/${this._movie.poster_path}" alt="Illustration">
        <div class="movie-info">
          <h2>${this._movie.original_title}</h2>
          <h5>Release Date: ${this._movie.release_date}</h3>
          <p>${this._movie.overview}</p>
        </div>
      `;
  }
}

customElements.define("movie-item", MovieItem);
