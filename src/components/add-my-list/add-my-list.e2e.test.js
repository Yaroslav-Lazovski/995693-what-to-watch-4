import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {AddMyList} from "./add-my-list.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should button be pressed`, () => {
  const onMyListButtonClick = jest.fn();

  const addMyList = shallow(
      <AddMyList
        id={1}
        isFavorite={true}
        authorizationStatus={`AUTH`}
        onFavoriteButtonClick={onMyListButtonClick}
      />
  );

  const button = addMyList.find(`.movie-card__button`);

  button.simulate(`click`);

  expect(onMyListButtonClick).toHaveBeenCalledTimes(1);
});
