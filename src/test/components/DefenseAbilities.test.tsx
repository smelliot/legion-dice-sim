import React from "react";

import { render } from "@testing-library/react";

import * as T from "../../code/Types";
import DefenseAbilities from "../../components/DefenseAbilities";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("DefenseAbilities", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <DefenseAbilities
        showSimpleView={false}
        inputs={input.defense}
        eventHandlers={events}
      ></DefenseAbilities>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot for simplified view", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <DefenseAbilities
        showSimpleView={true}
        inputs={input.defense}
        eventHandlers={events}
      ></DefenseAbilities>
    );

    expect(container).toMatchSnapshot();
  });
});
