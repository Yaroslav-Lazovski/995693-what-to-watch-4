import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";


import history from "../../history";
import {NewReview} from "./new-review.jsx";

const movie = {
  id: 1,
  title: `The Grand Budapest Hotel`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`
};

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <NewReview
          movie={movie}
          onRatingChange={() => {}}
          onCommentChange={() => {}}
          onSubmit={() => {}}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={0}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
