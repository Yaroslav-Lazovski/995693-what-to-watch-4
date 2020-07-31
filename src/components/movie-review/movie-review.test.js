import React from "react";
import renderer from "react-test-renderer";

import MovieReview from "./movie-review.jsx";


const review = {
  id: 1,
  user: {
    id: 4,
    name: `User`
  },
  comment: `Comment`,
  date: `December 24, 2016`,
  rating: 7.1,
};


describe(`MovieReview Snapshot`, () => {
  it(`Should MovieReview render correctly`, () => {
    const tree = renderer
      .create(<MovieReview
        review={review}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
