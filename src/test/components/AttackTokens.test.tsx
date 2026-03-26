import React from "react";

import { render } from "@testing-library/react";

import * as T from "../../code/Types";
import AttackTokens from "../../components/AttackTokens";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("AttackTokens", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateAttackEventHandlers();

    const { container } = render(
      <AttackTokens
        tokens={input.offense.tokens}
        eventHandlers={events}
      ></AttackTokens>
    );

    expect(container).toMatchSnapshot();
  });
});
