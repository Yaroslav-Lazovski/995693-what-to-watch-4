import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer.js";


const MAX_NUMBER_GENRES = 10;

class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    this.allMovies = this.props.movies;

    this.getGenresList = this.getGenresList.bind(this);
  }

  getGenresList() {
    const genres = new Set();

    genres.add(`All genres`);

    this.allMovies.forEach((movie) => {
      genres.add(movie.genre);
    });

    const genresList = Array.from(genres).slice(0, MAX_NUMBER_GENRES);
    return genresList;
  }

  render() {
    const {genre, onClick} = this.props;
    const genresList = this.getGenresList();

    return (
      <ul className="catalog__genres-list">
        {genresList.map((genreItem) => {
          const activeClass = genre === genreItem ? `catalog__genres-item--active` : ``;

          return <li
            key={genreItem}
            className={`catalog__genres-item ${activeClass}`}
            onClick={(evt)=>{
              evt.preventDefault();
              onClick(genreItem);
            }}
          >
            <a href="#" className="catalog__genres-link">{genreItem}</a>
          </li>;
        })}
      </ul>
    );
  }

}


GenresList.propTypes = {
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};


const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.movies
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getMoviesByGenre());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
