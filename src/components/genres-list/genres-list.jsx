import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/state/state.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getCurrentGenre} from "../../reducer/state/selectors.js";


const MAX_NUMBER_GENRES = 10;


export const GenresList = (props) => {
  const {genre, onClick} = props;

  const getGenresList = () => {
    const genres = new Set();

    genres.add(`All genres`);

    props.movies.forEach((movie) => {
      genres.add(movie.genre);
    });

    return Array.from(genres).slice(0, MAX_NUMBER_GENRES);
  };

  const genresList = getGenresList();

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
};


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
  genre: getCurrentGenre(state),
  movies: getMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetShowedMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
