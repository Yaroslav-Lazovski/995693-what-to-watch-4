import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
  }

  _handleMovieCardMouseEnter(movie) {
    this.setState({
      activeCard: movie
    });
  }

  render() {
    const {movies, onTitleClick, onPosterClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <SmallMovieCard
            key={movie + index}
            movie={movie}
            onTitleClick={onTitleClick}
            onPosterClick={onPosterClick}
            onMouseEnter={this._handleMovieCardMouseEnter}
          />
        ))}
      </div>
    );
  }
}


MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
};


export default MoviesList;
