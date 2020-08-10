import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {SignIn} from "./sign-in.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`react-router-dom`);

const mockEvent = {
  preventDefault() {}
};

const mock = {
  login: `test@example.com`,
  password: `12345678`
};

it(`Sign in submit click`, () => {
  const submitHandler = jest.fn();

  const signIn = mount(
      <SignIn
        onSubmit={submitHandler}
        authorizationStatus={`NO_AUTH`}
        isErrorAuth={false}
      />
  );

  const submitButton = signIn.find(`.sign-in__form`);
  const {loginRef, passwordRef} = signIn.instance();

  loginRef.current.value = mock.login;
  passwordRef.current.value = mock.password;

  submitButton.simulate(`submit`, mockEvent);

  expect(submitHandler).toHaveBeenCalledTimes(1);
  expect(submitHandler).toBeCalledWith(mock);
});
