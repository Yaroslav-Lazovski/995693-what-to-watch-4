import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player.js";

import {GENRES} from "../../consts.js";

const SmallMovieCardWrapper = withVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }


  _getFilteredMovies(genre, allMovies) {
    if (genre === GENRES.ALL) {
      return allMovies;
    }

    const filteredMovies = allMovies.filter((movie) => movie.genre === genre);

    return filteredMovies;
  }

  render() {
    const {movies, genre, onTitleClick, onPosterClick, onMouseEnter, onMouseLeave} = this.props;
    const filteredMovies = this._getFilteredMovies(genre, movies);

    return (
      <div className="catalog__movies-list">
        {filteredMovies.map((movie, index) => (
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
  genre: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});


export default connect(mapStateToProps)(MoviesList);
