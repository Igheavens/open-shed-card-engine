// Invented examples shaped like a small subset of Open Shed's GameView.
// These are not captured player hands and do not connect to a live game.
export function makePracticeView() {
  return {
    revision: 4,
    activeColor: "red",
    hand: [
      { id: "practice-blue-9", kind: "number", color: "blue", number: 9 },
      { id: "practice-red-3", kind: "number", color: "red", number: 3 },
    ],
    legalActions: { playableCardIds: ["practice-red-3"] },
  };
}
