import React from "react";

import { render } from "@testing-library/react";

import Header from "../../components/Header";

describe("Header", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Header></Header>);
    expect(container).toMatchSnapshot();
  });
});
