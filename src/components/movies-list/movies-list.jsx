import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {connect} from "react-redux";

import {GENRES} from "../../consts.js";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
    this._handleMovieCardMouseLeave = this._handleMovieCardMouseLeave.bind(this);
  }

  _handleMovieCardMouseEnter(id) {
    this.setState({
      activeCard: id
    });
  }

  _handleMovieCardMouseLeave() {
    this.setState({
      activeCard: null
    });
  }

  _getFilteredMovies(genre, allMovies) {
    if (genre === GENRES.ALL) {
      return allMovies;
    }

    const filteredMovies = allMovies.filter((movie) => movie.genre === genre);

    return filteredMovies;
  }

  render() {
    const {movies, genre, onTitleClick, onPosterClick} = this.props;
    const filteredMovies = this._getFilteredMovies(genre, movies);

    return (
      <div className="catalog__movies-list">
        {filteredMovies.map((movie, index) => (
          <SmallMovieCard
            key={movie + index}
            movie={movie}
            onTitleClick={onTitleClick}
            onPosterClick={onPosterClick}
            onMouseEnter={this._handleMovieCardMouseEnter}
            onMouseLeave={this._handleMovieCardMouseLeave}
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
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});


export default connect(mapStateToProps)(MoviesList);
