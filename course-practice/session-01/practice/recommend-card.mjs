/**
 * Session 1 teaching exercise, using invented data only.
 * This suggests a card ID; it does not decide the rules or play a move.
 */
export function recommendCard(view) {
  if (view.legalActions.playableCardIds.length === 0) return null;

  // Deliberate lesson bug: the first card in a hand may not be playable.
  // Change this line after reading the failing test.
  return view.hand[0]?.id ?? null;
}
