import React from "react";

import { render, fireEvent } from "@testing-library/react";

import * as T from "../../code/Types";
import Defense from "../../components/Defense";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("Defense", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <Defense
        profileDialogId="defenseProfileDialog"
        showSimpleView={false}
        input={input.defense}
        eventHandlers={events}
      ></Defense>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot for simplified view", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <Defense
        profileDialogId="defenseProfileDialog"
        showSimpleView={true}
        input={input.defense}
        eventHandlers={events}
      ></Defense>
    );

    expect(container).toMatchSnapshot();
  });

  it("handles surge conversion changing", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateDefenseEventHandlers();

    const { container } = render(
      <Defense
        profileDialogId="defenseProfileDialog"
        showSimpleView={false}
        input={input.defense}
        eventHandlers={events}
      ></Defense>
    );
    const selects = container.querySelectorAll("select");
    const coverSelect = selects[1] as HTMLSelectElement;
    fireEvent.change(coverSelect, { target: { value: "heavy" } });

    expect(events.handleCoverChange).toHaveBeenCalledTimes(1);
    expect(events.handleCoverChange).toHaveBeenCalledWith("heavy");
  });
});
