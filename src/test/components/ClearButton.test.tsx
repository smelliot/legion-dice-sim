import React from "react";

import { render, fireEvent } from "@testing-library/react";

import ClearButton from "../../components/ClearButton";

describe("ClearButton", () => {
  it("matches the snapshot", () => {
    const onClick = jest.fn();

    const { container } = render(
      <ClearButton onClick={onClick} tooltip="Clear..."></ClearButton>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles being clicked", () => {
    const onClick = jest.fn();

    const { container } = render(
      <ClearButton onClick={onClick} tooltip="Clear..."></ClearButton>
    );
    const btn = container.querySelector(".btn") as HTMLElement;
    fireEvent.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
