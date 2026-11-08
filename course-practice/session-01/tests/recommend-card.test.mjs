import assert from "node:assert/strict";
import test from "node:test";
import { recommendCard } from "../practice/recommend-card.mjs";
import { makePracticeView } from "../practice/scenarios.mjs";

test("recommends the playable card when the first hand card is not playable", () => {
  const view = makePracticeView();
  assert.equal(recommendCard(view), "practice-red-3");
});

test("follows a different allowed card instead of hard-coding the red card", () => {
  const view = makePracticeView();
  view.activeColor = "blue";
  view.legalActions.playableCardIds = ["practice-blue-9"];
  assert.equal(recommendCard(view), "practice-blue-9");
});

test("returns null when no card is permitted and leaves the input unchanged", () => {
  const view = makePracticeView();
  view.legalActions.playableCardIds = [];
  const before = structuredClone(view);
  assert.equal(recommendCard(view), null);
  assert.deepEqual(view, before);
});
