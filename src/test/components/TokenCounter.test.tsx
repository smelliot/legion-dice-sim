import React from "react";

import { render, fireEvent } from "@testing-library/react";

import TokenCounter from "../../components/TokenCounter";

describe("TokenCounter", () => {
  it("matches the snapshot", () => {
    const onClick = jest.fn();

    const { container } = render(
      <TokenCounter
        visible={true}
        value={3}
        onClick={onClick}
        tokenCssClass="token-counter-aim"
        tooltip="Helpful text"
      ></TokenCounter>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when not visible", () => {
    const onClick = jest.fn();

    const { container } = render(
      <TokenCounter
        visible={false}
        value={1}
        onClick={onClick}
        tokenCssClass="token-counter-observe"
        tooltip="Watching!"
      ></TokenCounter>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles being clicked", () => {
    const onClick = jest.fn();

    const { container } = render(
      <TokenCounter
        visible={true}
        value={2}
        onClick={onClick}
        tokenCssClass="token-counter-dodge"
        tooltip="Dodging..."
      ></TokenCounter>
    );
    const btn = container.querySelector(".btn") as HTMLElement;
    fireEvent.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
