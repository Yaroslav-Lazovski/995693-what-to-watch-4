import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {GenresList} from "./genres-list.jsx";

import {GENRES} from "../../consts.js";
import movies from "../../mocks/films.js";

Enzyme.configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {}
};


it(`Should Genre items be clicked`, () => {
  const onClick = jest.fn();

  const genresList = shallow(
      <GenresList
        genre={GENRES.ALL}
        movies={movies}
        onClick={onClick}
      />
  );

  const genreItems = genresList.find(`li.catalog__genres-item`);

  genreItems.forEach((item) => {
    item.simulate(`click`, mockEvent);
  });

  expect(onClick).toHaveBeenCalledTimes(genreItems.length);
});

it(`Should Genre item return expected value`, () => {
  const onClick = jest.fn();
  const expectedValue = GENRES.KIDS_FAMILY;

  const genresList = shallow(
      <GenresList
        genre={GENRES.ALL}
        movies={movies}
        onClick={onClick}
      />
  );

  const dramaItem = genresList.find(`li.catalog__genres-item`).at(1);

  dramaItem.simulate(`click`, mockEvent);

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick.mock.calls[0][0]).toEqual(expectedValue);
});
