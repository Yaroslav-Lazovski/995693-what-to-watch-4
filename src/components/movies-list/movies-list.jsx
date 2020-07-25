import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player.js";

import {getFilteredMovies, getShowedMovies} from "../../reducer/state/selectors.js";

const SmallMovieCardWrapper = withVideoPlayer(SmallMovieCard);

export class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const {movies, showedMoviesNumber, onTitleClick, onPosterClick, onMouseEnter, onMouseLeave} = this.props;
    const showedMovies = movies.slice(0, showedMoviesNumber);

    return (
      <div className="catalog__movies-list">
        {showedMovies.map((movie, index) => (
          <SmallMovieCardWrapper
            key={movie + index}
            movie={movie}
            onTitleClick={onTitleClick}
            onPosterClick={onPosterClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>
    );
  }
}


MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  showedMoviesNumber: PropTypes.number.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getFilteredMovies(state),
  showedMoviesNumber: getShowedMovies(state),
});


export default connect(mapStateToProps)(MoviesList);
