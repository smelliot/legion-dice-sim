import React from "react";

import { render } from "@testing-library/react";

import LoadProfileButton from "../../../components/profiles/LoadProfileButton";

describe("FactionButtonGroup", () => {
  it("matches the snapshot", () => {
    const { container } = render(
      <LoadProfileButton
        dialogId="fakeDialog"
        tooltip="My tooltip"
      ></LoadProfileButton>
    );
    expect(container).toMatchSnapshot();
  });
});
