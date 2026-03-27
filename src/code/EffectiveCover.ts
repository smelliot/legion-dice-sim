import * as T from "./Types";

/**
 * Returns a conservative estimate of guaranteed cover saves for reroll strategy heuristics.
 * With the dice-based cover system, only Low Profile provides a guaranteed save.
 * The cover dice themselves are probabilistic and not counted here.
 */
export function getGuaranteedCoverSaves(input: T.AttackInput): number {
  const effectiveCover = getEffectiveCover(input);
  if (effectiveCover === T.Cover.None) {
    return 0;
  }
  return input.defense.lowProfile ? 1 : 0;
}

export function getEffectiveCover(input: T.AttackInput): T.Cover {
  // cover only applies to ranged attacks
  if (input.combat.meleeAttack) {
    return T.Cover.None;
  }

  // effective cover with modifications
  let effectiveCover = input.defense.cover;

  // cover from suppression (only if suppression >= courage)
  if (input.defense.tokens.suppression >= input.defense.courage) {
    if (effectiveCover == T.Cover.None) {
      effectiveCover = T.Cover.Light;
    } else if (effectiveCover == T.Cover.Light) {
      effectiveCover = T.Cover.Heavy;
    }
  }

  // sharpshooter X
  if (input.offense.sharpshooterX.active && effectiveCover !== T.Cover.None) {
    if (input.offense.sharpshooterX.value == 1) {
      if (effectiveCover === T.Cover.Heavy) {
        effectiveCover = T.Cover.Light;
      } else {
        effectiveCover = T.Cover.None;
      }
    } else if (input.offense.sharpshooterX.value == 2) {
      effectiveCover = T.Cover.None;
    }
  }

  // blast & immune: blast
  if (input.offense.blast && !input.defense.immuneBlast) {
    effectiveCover = T.Cover.None;
  }

  return effectiveCover;
}
