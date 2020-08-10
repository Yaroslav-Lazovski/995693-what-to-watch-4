import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player.js";

import {getShowedMovies} from "../../reducer/state/selectors.js";

const SmallMovieCardWrapper = withVideoPlayer(SmallMovieCard);


export const MoviesList = (props) => {
  const {movies, showedMoviesNumber, onMouseEnter, onMouseLeave} = props;
  const showedMovies = movies.slice(0, showedMoviesNumber);

  return (
    <div className="catalog__movies-list">
      {showedMovies.map((movie, index) => (
        <SmallMovieCardWrapper
          key={movie + index}
          movie={movie}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
};


MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  showedMoviesNumber: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showedMoviesNumber: getShowedMovies(state),
});


export default connect(mapStateToProps)(MoviesList);
