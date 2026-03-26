import React from "react";

import { render } from "@testing-library/react";

import * as T from "../../code/Types";
import Combat from "../../components/Combat";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("Combat", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateCombatEventHandlers();

    const { container } = render(
      <Combat input={input.combat} eventHandlers={events}></Combat>
    );
    expect(container).toMatchSnapshot();
  });
});
