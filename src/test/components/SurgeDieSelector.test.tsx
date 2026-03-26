import React from "react";

import { render, fireEvent } from "@testing-library/react";

import * as T from "../../code/Types";
import SurgeDieSelector from "../../components/SurgeDieSelector";

describe("SurgeDieSelector", () => {
  it("matches the snapshot (white with surge)", () => {
    const onClick = jest.fn();

    const { container } = render(
      <SurgeDieSelector
        color={T.DieColor.White}
        surge={true}
        onClick={onClick}
      ></SurgeDieSelector>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot (red with surge)", () => {
    const onClick = jest.fn();

    const { container } = render(
      <SurgeDieSelector
        color={T.DieColor.Red}
        surge={true}
        onClick={onClick}
      ></SurgeDieSelector>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles being clicked", () => {
    const onClick = jest.fn();

    const { container } = render(
      <SurgeDieSelector
        color={T.DieColor.Red}
        surge={false}
        onClick={onClick}
      ></SurgeDieSelector>
    );
    const btn = container.querySelector(".btn") as HTMLElement;
    fireEvent.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
