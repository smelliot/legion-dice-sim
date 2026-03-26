import React from "react";

import { render } from "@testing-library/react";

import * as T from "../../code/Types";
import AttackAbilities from "../../components/AttackAbilities";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("AttackAbilities", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateAttackEventHandlers();

    const { container } = render(
      <AttackAbilities
        showSimpleView={false}
        input={input.offense}
        eventHandlers={events}
      ></AttackAbilities>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot for simplified view", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateAttackEventHandlers();

    const { container } = render(
      <AttackAbilities
        showSimpleView={true}
        input={input.offense}
        eventHandlers={events}
      ></AttackAbilities>
    );

    expect(container).toMatchSnapshot();
  });
});
