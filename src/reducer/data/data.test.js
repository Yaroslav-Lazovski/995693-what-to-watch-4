import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {reducer, ActionType, Operation} from "./data";

const api = createAPI(() => {});

const promoMovie = {
  id: 1,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  runTime: 99,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  posterBig: `img/the-grand-budapest-hotel-poster.jpg`,
  ratingScore: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
                    Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  isFavorite: false
};

const movies = [
  {
    id: 1,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: 2014,
    runTime: 99,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    posterBig: `img/the-grand-budapest-hotel-poster.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
                      Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    isFavorite: false
  }
];

const reviews = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  }
];

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: [],
      promoMovie: {},
      reviews: [],
      favoriteMovies: [],
      isLoadingFavoriteMovie: false,
      isLoadingMovies: true,
      isLoadingPromoMovie: true,
      isFormDisabled: false,
      isLoadingComments: false,
      isErrorLoading: false,
    });
  });

  it(`Reducer should update movies by load movies`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    })).toEqual({
      movies,
    });
  });

  it(`Reducer should update promo movie by load promo movie`, () => {
    expect(reducer({
      promoMovie: {},
    }, {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: promoMovie,
    })).toEqual({
      promoMovie,
    });
  });

  it(`Reducer should update reviews movie by load reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      payload: reviews,
    })).toEqual({
      reviews,
    });
  });

  it(`Reducer should set form disabled`, () => {
    expect(reducer({
      isFormDisabled: false
    }, {
      type: ActionType.SET_FORM_DISABLED,
      payload: true
    })).toEqual({
      isFormDisabled: true
    });
  });

  it(`Reducer should change loading movies state`, () => {
    expect(reducer({
      isLoadingMovies: false
    }, {
      type: ActionType.LOADING_MOVIES,
      payload: true
    })).toEqual({
      isLoadingMovies: true
    });
  });

  it(`Reducer should change loading promo movie state`, () => {
    expect(reducer({
      isLoadingPromoMovie: false
    }, {
      type: ActionType.LOADING_PROMO_MOVIE,
      payload: true
    })).toEqual({
      isLoadingPromoMovie: true
    });
  });

  it(`Reducer should change loading comments state`, () => {
    expect(reducer({
      isLoadingComments: false
    }, {
      type: ActionType.LOADING_COMMENTS,
      payload: true
    })).toEqual({
      isLoadingComments: true
    });
  });

  it(`Reducer should change loading status`, () => {
    expect(reducer({
      isErrorLoading: false
    }, {
      type: ActionType.GET_ERROR_STATUS,
      payload: true
    })).toEqual({
      isErrorLoading: true
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadMovieComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOADING_COMMENTS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_MOVIE_COMMENTS,
          payload: [{fake: true}],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOADING_COMMENTS,
          payload: false,
        });
      });
  });

  it(`Should make a correct send to /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentSending = Operation.postComment(1, {
      rating: `1`,
      comment: `comment`,
    });

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentSending(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FORM_DISABLED,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_FORM_DISABLED,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.GET_ERROR_STATUS,
          payload: false,
        });
      });
  });
});
