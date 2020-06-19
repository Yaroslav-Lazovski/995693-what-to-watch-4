import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null
    };

    this.handleMovieCardMouseEnter = this.handleMovieCardMouseEnter.bind(this);
  }

  handleMovieCardMouseEnter(movieTitle) {
    this.setState({
      activeMovie: movieTitle
    });
  }

  render() {
    const {movies, onTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          return (
            <SmallMovieCard
              key={movie + index}
              movie={movie}
              onTitleClick={onTitleClick}
              onMouseEnter={this.handleMovieCardMouseEnter}
            />
          );
        })}
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
};


export default MoviesList;
