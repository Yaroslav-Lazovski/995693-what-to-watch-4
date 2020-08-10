import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {NewReview} from "./new-review.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

const movie = {
  id: 1,
  title: `The Grand Budapest Hotel`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  posterBig: `img/the-grand-budapest-hotel-poster.jpg`
};

describe(`Form work correctly`, () => {
  it(`Should form be submitted`, () => {
    const onSubmit = jest.fn();

    const addReview = shallow(
        <NewReview
          movie={movie}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={1}
          onRatingChange={() => {}}
          onCommentChange={() => {}}
          onSubmit={onSubmit}
        />
    );

    const form = addReview.find(`.add-review__form`);
    form.simulate(`submit`, mockEvent);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(mockEvent);
  });

  it(`Should rating be changed`, () => {
    const onRatingChange = jest.fn();

    const addReview = shallow(
        <NewReview
          movie={movie}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={1}
          onRatingChange={onRatingChange}
          onCommentChange={() => {}}
          onSubmit={() => {}}
        />
    );

    const ratingStars = addReview.find(`.rating__input`);
    ratingStars.at(2).simulate(`change`, mockEvent);

    expect(onRatingChange).toHaveBeenCalledTimes(1);
    expect(onRatingChange).toHaveBeenCalledWith(mockEvent);
  });

  it(`Should comment be changed`, () => {
    const onCommentChange = jest.fn();

    const addReview = shallow(
        <NewReview
          movie={movie}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={1}
          onRatingChange={() => {}}
          onCommentChange={onCommentChange}
          onSubmit={() => {}}
        />
    );

    const comment = addReview.find(`.add-review__textarea`);

    comment.simulate(`change`, mockEvent);

    expect(onCommentChange).toHaveBeenCalledTimes(1);
    expect(onCommentChange).toHaveBeenCalledWith(mockEvent);
  });
});
