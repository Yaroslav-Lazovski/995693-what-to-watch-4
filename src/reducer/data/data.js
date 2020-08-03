import {extend} from "../../utils";
import {movieAdapter, moviesAdapter} from "../../adapters/movie-adapter";
import {ActionCreator as ActionCreatorState} from "../state/state";

const initialState = {
  movies: [],
  promoMovie: {},
  reviews: []
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_MOVIE_COMMENTS: `LOAD_COMMENTS`
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies
    };
  },
  loadPromoMovie: (promoMovie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: promoMovie
    };
  },
  loadMovieComments: (comments) => {
    return {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      payload: comments
    };
  }
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(moviesAdapter(response.data)));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(movieAdapter(response.data)));
      });
  },

  loadMovieComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieComments(response.data));
      });
  },

  postComment: (id, comment) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then(() => {
        dispatch(ActionCreatorState.setFormDisabled(false));
      })
      .catch((err) => {
        dispatch(ActionCreatorState.setFormDisabled(false));

        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload
      });

    case ActionType.LOAD_MOVIE_COMMENTS:
      return extend(state, {
        reviews: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
