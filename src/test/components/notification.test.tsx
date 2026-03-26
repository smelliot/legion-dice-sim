import React from "react";

import { render } from "@testing-library/react";

import Notification from "../../components/Notification";

describe("Notification", () => {
  it("matches the snapshot", () => {
    const { container } = render(
      <Notification message="This is a test."></Notification>
    );
    expect(container).toMatchSnapshot();
  });
});
