import React from "react";

import { render, fireEvent } from "@testing-library/react";

import DieCounter from "../../components/DieCounter";

describe("DieCounter", () => {
  it("matches the snapshot", () => {
    const onClick = jest.fn();

    const { container } = render(
      <DieCounter count={4} styleName="btn-dark" onClick={onClick}></DieCounter>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles being clicked", () => {
    const onButtonClickMock = jest.fn();

    const { container } = render(
      <DieCounter
        count={4}
        styleName="btn-dark"
        onClick={onButtonClickMock}
      ></DieCounter>
    );
    const btn = container.querySelector(".btn") as HTMLElement;
    fireEvent.click(btn);

    expect(onButtonClickMock).toHaveBeenCalledTimes(1);
  });
});
