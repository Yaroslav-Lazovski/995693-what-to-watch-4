import React from "react";
import renderer from "react-test-renderer";

import {NewReview} from "./new-review.jsx";

const movie = {
  title: `The Grand Budapest Hotel`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`
};

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <NewReview
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
