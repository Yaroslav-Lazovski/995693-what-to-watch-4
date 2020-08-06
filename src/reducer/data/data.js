import {AppRoute} from "../../consts";

import {extend} from "../../utils";
import {movieAdapter, moviesAdapter} from "../../adapters/movie-adapter";
import history from "../../history";

const initialState = {
  movies: [],
  promoMovie: {},
  reviews: [],
  isFormDisabled: false,
  isLoadingMovies: false,
  isLoadingPromoMovie: false,
  isLoadingComments: false,
  isErrorLoading: false,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_MOVIE_COMMENTS: `LOAD_COMMENTS`,
  SET_FORM_DISABLED: `SET_FORM_DISABLED`,
  LOADING_MOVIES: `LOADING_MOVIES`,
  LOADING_PROMO_MOVIE: `LOADING_PROMO_MOVIE`,
  LOADING_COMMENTS: `LOADING_COMMENTS`,
  GET_ERROR_STATUS: `GET_ERROR_STATUS`
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
  },

  setFormDisabled: (bool) => ({
    type: ActionType.SET_FORM_DISABLED,
    payload: bool
  }),

  loadingMovies: (bool) => ({
    type: ActionType.LOADING_MOVIES,
    payload: bool
  }),

  loadingPromoMovie: (bool) => ({
    type: ActionType.LOADING_PROMO_MOVIE,
    payload: bool
  }),

  loadingComments: (bool) => ({
    type: ActionType.LOADING_COMMENTS,
    payload: bool
  }),

  getErrorStatus: (bool) => ({
    type: ActionType.GET_ERROR_STATUS,
    payload: bool
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingMovies(true));
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(moviesAdapter(response.data)));
        dispatch(ActionCreator.loadingMovies(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingMovies(false));
        throw err;
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingPromoMovie(true));
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(movieAdapter(response.data)));
        dispatch(ActionCreator.loadingPromoMovie(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingPromoMovie(false));
        throw err;
      });
  },

  loadMovieComments: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingComments(true));
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieComments(response.data));
        dispatch(ActionCreator.loadingComments(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingComments(false));
        throw err;
      });
  },

  postComment: (id, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setFormDisabled(true));
    return api.post(`/comments/${id}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then(() => {
        dispatch(ActionCreator.setFormDisabled(false));
        dispatch(ActionCreator.getErrorStatus(false));
        history.push(`${AppRoute.FILM}/${id}`);
      })
      .catch((err) => {
        dispatch(ActionCreator.setFormDisabled(false));
        dispatch(ActionCreator.getErrorStatus(true));

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

    case ActionType.SET_FORM_DISABLED:
      return extend(state, {
        isFormDisabled: action.payload
      });

    case ActionType.LOADING_MOVIES:
      return extend(state, {
        isLoadingMovies: action.payload
      });

    case ActionType.LOADING_PROMO_MOVIE:
      return extend(state, {
        isLoadingPromoMovie: action.payload
      });

    case ActionType.LOADING_COMMENTS:
      return extend(state, {
        isLoadingComments: action.payload
      });

    case ActionType.GET_ERROR_STATUS:
      return extend(state, {
        isErrorLoading: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
