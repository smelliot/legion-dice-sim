import React from "react";

import { render } from "@testing-library/react";

import * as T from "../../code/Types";
import DefenseTokens from "../../components/DefenseTokens";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("DefenseTokens", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <DefenseTokens
        showSimplifiedView={false}
        tokens={input.defense.tokens}
        eventHandlers={events}
      ></DefenseTokens>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot for simplified view", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <DefenseTokens
        showSimplifiedView={true}
        tokens={input.defense.tokens}
        eventHandlers={events}
      ></DefenseTokens>
    );

    expect(container).toMatchSnapshot();
  });
});
