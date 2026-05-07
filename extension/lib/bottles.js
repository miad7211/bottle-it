// Bottle type catalog. Each entry has an emoji (placeholder for AI photo)
// and a human-readable label.
export const BOTTLE_TYPES = {
  cola:        { emoji: '🥤', label: 'Cola' },
  soda:        { emoji: '🧃', label: 'Soda' },
  beer:        { emoji: '🍺', label: 'Beer' },
  bubble_tea:  { emoji: '🧋', label: 'Bubble Tea' },
  wine_red:    { emoji: '🍷', label: 'Red Wine' },
  wine_white:  { emoji: '🥂', label: 'White Wine' },
  champagne:   { emoji: '🍾', label: 'Champagne' },
  sake:        { emoji: '🍶', label: 'Sake' },
  whiskey:     { emoji: '🥃', label: 'Whiskey' },
};

// Hidden progression: more bottle types quietly become available
// as the user successfully completes more cool-off periods.
// The user never sees these thresholds — they just notice new bottles appearing.
const PROGRESSION = [
  { unlocksAt: 0,  bottles: ['cola', 'soda'] },
  { unlocksAt: 2,  bottles: ['beer', 'bubble_tea'] },
  { unlocksAt: 5,  bottles: ['wine_red', 'wine_white'] },
  { unlocksAt: 10, bottles: ['champagne', 'sake'] },
  { unlocksAt: 20, bottles: ['whiskey'] },
];

export function getUnlockedBottles(successfulUnlocksCount) {
  return PROGRESSION
    .filter(tier => successfulUnlocksCount >= tier.unlocksAt)
    .flatMap(tier => tier.bottles);
}

export function pickBottleType(durationDays, successfulUnlocksCount) {
  const pool = getUnlockedBottles(successfulUnlocksCount);
  // Longer locks bias toward the back of the pool (rarer bottles)
  // by sampling multiple times and keeping the highest index.
  const samples = 1 + Math.floor(durationDays / 7);
  let idx = 0;
  for (let i = 0; i < samples; i++) {
    idx = Math.max(idx, Math.floor(Math.random() * pool.length));
  }
  return pool[idx];
}

export function countSuccessfulUnlocks(items) {
  return items.filter(
    i => i.status === 'opened-bought' || i.status === 'opened-tossed'
  ).length;
}

export function isFirstAppearance(bottleType, existingItems) {
  return !existingItems.some(i => i.bottleType === bottleType);
}
