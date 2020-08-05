import React from "react";
import renderer from "react-test-renderer";

import {MovieReviews} from "./movie-reviews.jsx";


const reviews = [
  {
    id: 1,
    user: {
      id: 4,
      name: `User`
    },
    comment: `Comment`,
    date: `December 24, 2016`,
    rating: 7.1,
  },
  {
    id: 2,
    user: {
      id: 3,
      name: `User`
    },
    comment: `Comment`,
    date: `December 24, 2016`,
    rating: 7.1,
  },
];

const movie = {
  id: 1
};


describe(`MovieReviews Snapshot`, () => {
  it(`Should MovieReviews render correctly`, () => {
    const tree = renderer
      .create(<MovieReviews
        reviews={reviews}
        movie={movie}
        getMovieComments={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
