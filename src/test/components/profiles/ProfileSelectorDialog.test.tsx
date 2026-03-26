import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as AL from "../../../code/profiles/AllowList";
import * as UC from "../../../code/profiles/UpgradeCard";
import * as UP from "../../../code/profiles/UnitProfile";

import ProfileSelectorDialog from "components/profiles/ProfileSelectorDialog";

describe("ProfileSelectorDialog", () => {
  it("attack profile matches the snapshot", () => {
    const onApplyProfile = jest.fn();

    const { container } = render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );
    expect(container).toMatchSnapshot();
  });

  it("defense profile matches the snapshot", () => {
    const onApplyProfile = jest.fn();

    const { container } = render(
      <ProfileSelectorDialog
        id="defenseProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.defense}
      ></ProfileSelectorDialog>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles faction change", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    expect(screen.getByDisplayValue("rebel")).toBeChecked();

    fireEvent.click(screen.getByTitle("Empire"));
    expect(screen.getByDisplayValue("rebel")).not.toBeChecked();
    expect(screen.getByDisplayValue("empire")).toBeChecked();

    fireEvent.click(screen.getByText("Apply"));
    const target = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.empire && u.rank === UP.Rank.commander
    )[0];
    expect(trackedProfile).toEqual(target);
  });

  it("handles rank change", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    expect(screen.getByDisplayValue("commander")).toBeChecked();

    fireEvent.click(screen.getByTitle("Operative"));
    expect(screen.getByDisplayValue("commander")).not.toBeChecked();
    expect(screen.getByDisplayValue("operative")).toBeChecked();

    fireEvent.click(screen.getByText("Apply"));
    const target = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.rebel && u.rank === UP.Rank.operative
    )[0];
    expect(trackedProfile).toEqual(target);
  });

  it("handles unit change", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    const target = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.rebel && u.rank === UP.Rank.commander
    )[2];
    fireEvent.change(
      screen.getByRole("combobox", { name: "Unit name", hidden: true }),
      { target: { value: target.name } }
    );
    fireEvent.click(screen.getByText("Apply"));
    expect(trackedProfile).toEqual(target);
  });

  it("handles weapon change", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    const target = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.rebel && u.rank === UP.Rank.commander
    )[0];
    const weapons = [target.weapons[1]];

    fireEvent.change(
      screen.getByRole("combobox", { name: "Weapon 0", hidden: true }),
      { target: { value: weapons[0].name } }
    );
    fireEvent.click(screen.getByText("Apply"));
    expect(trackedProfile).toEqual(target);
    expect(trackedWeapons).toEqual(weapons);
  });

  it("handles weapon change with multiple weapons", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    fireEvent.click(screen.getByTitle("Empire"));
    fireEvent.click(screen.getByTitle("Operative"));
    fireEvent.change(
      screen.getByRole("combobox", { name: "Unit name", hidden: true }),
      { target: { value: "Boba Fett" } }
    );

    const target = UP.getUnits().filter((u) => u.name === "Boba Fett")[0];
    const weapons = [target.weapons[1], target.weapons[2]];

    fireEvent.change(
      screen.getByRole("combobox", { name: "Weapon 0", hidden: true }),
      { target: { value: weapons[0].name } }
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Weapon 1", hidden: true }),
      { target: { value: weapons[1].name } }
    );

    fireEvent.click(screen.getByText("Apply"));
    expect(trackedProfile).toEqual(target);
    expect(trackedWeapons).toEqual(weapons);
  });

  it("handles weapon change to clear value", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    const target = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.rebel && u.rank === UP.Rank.commander
    )[0];
    const offsetWeapon = target.weapons[0];

    fireEvent.change(
      screen.getByRole("combobox", { name: "Weapon 0", hidden: true }),
      { target: { value: offsetWeapon.name } }
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Weapon 0", hidden: true }),
      { target: { value: "" } }
    );

    fireEvent.click(screen.getByText("Apply"));
    expect(trackedProfile).toEqual(target);
    expect(trackedWeapons).toEqual([]);
  });

  it("handles upgrade change", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    const target = UP.getUnits().filter((u) => u.name === "Cassian Andor")[0];
    const upgrade = UC.getUpgrades().filter(
      (u) => u.name === "A280-CFE Sniper Config"
    )[0];

    fireEvent.change(
      screen.getByRole("combobox", { name: "Unit name", hidden: true }),
      { target: { value: target.name } }
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Upgrade 1", hidden: true }),
      { target: { value: upgrade.name } }
    );

    fireEvent.click(screen.getByText("Apply"));
    expect(trackedProfile).toEqual(target);
    expect(trackedUpgrades).toEqual([undefined, upgrade]);
  });

  it("handles multiple upgrades", () => {
    let trackedProfile = UP.getUnits()[0];
    let trackedWeapons: Array<UP.Weapon> = [];
    let trackedUpgrades: Array<UC.Upgrade> = [];

    function onApplyProfile(
      profile: UP.UnitProfile,
      weapons: Array<UP.Weapon>,
      upgrades: Array<UC.Upgrade>
    ) {
      trackedProfile = profile;
      trackedWeapons = weapons;
      trackedUpgrades = upgrades;
    }

    render(
      <ProfileSelectorDialog
        id="attackProfileSelector"
        applyProfile={onApplyProfile}
        upgradeAllowListName={AL.AllowListName.attack}
      ></ProfileSelectorDialog>
    );

    fireEvent.click(screen.getByTitle("Republic"));
    fireEvent.click(screen.getByTitle("Special Forces"));
    fireEvent.change(
      screen.getByRole("combobox", { name: "Unit name", hidden: true }),
      { target: { value: "ARC Troopers" } }
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Unit subtitle", hidden: true }),
      { target: { value: "Strike Team" } }
    );

    const target = UP.getUnits().filter(
      (u) => u.name === "ARC Troopers" && u.subtitle === "Strike Team"
    )[0];
    const upgrade1 = UC.getUpgrades().filter(
      (u) => u.name === "DC-15x ARC Trooper"
    )[0];
    const upgrade2 = UC.getUpgrades().filter(
      (u) => u.name === "Targeting Scopes"
    )[0];

    fireEvent.change(
      screen.getByRole("combobox", { name: "Upgrade 0", hidden: true }),
      { target: { value: upgrade1.name } }
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Upgrade 1", hidden: true }),
      { target: { value: upgrade2.name } }
    );

    fireEvent.click(screen.getByText("Apply"));
    expect(trackedProfile).toEqual(target);
    expect(trackedUpgrades).toEqual([upgrade1, upgrade2]);
  });
});
