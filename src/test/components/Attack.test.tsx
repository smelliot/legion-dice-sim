import React from "react";

import { render, fireEvent } from "@testing-library/react";

import * as T from "../../code/Types";
import Attack from "../../components/Attack";

import * as EventMocks from "../mocks/EventHandlerMocks";

describe("Attack", () => {
  it("matches the snapshot", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateAttackEventHandlers();

    const { container } = render(
      <Attack
        profileDialogId="attackProfileDialog"
        showSimpleView={false}
        input={input.offense}
        eventHandlers={events}
      ></Attack>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot for simplified view", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateAttackEventHandlers();

    const { container } = render(
      <Attack
        profileDialogId="attackProfileDialog"
        showSimpleView={true}
        input={input.offense}
        eventHandlers={events}
      ></Attack>
    );

    expect(container).toMatchSnapshot();
  });

  it("handles surge conversion changing", () => {
    const input = T.createDefaultAttackInput();
    const events = EventMocks.createMockAppStateAttackEventHandlers();

    const { container } = render(
      <Attack
        profileDialogId="attackProfileDialog"
        showSimpleView={true}
        input={input.offense}
        eventHandlers={events}
      ></Attack>
    );
    const select = container.querySelector("select") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 2 } });

    expect(events.handleSurgeConversionChange).toHaveBeenCalledTimes(1);
    expect(events.handleSurgeConversionChange).toHaveBeenCalledWith(2);
  });
});
