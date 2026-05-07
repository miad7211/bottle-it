import { describe, it, expect } from 'vitest';
import {
  pickBottleType,
  getUnlockedBottles,
  countSuccessfulUnlocks,
  isFirstAppearance,
  BOTTLE_TYPES,
} from '../extension/lib/bottles.js';

describe('getUnlockedBottles', () => {
  it('starts with only cola and soda', () => {
    expect(getUnlockedBottles(0).sort()).toEqual(['cola', 'soda']);
    expect(getUnlockedBottles(1).sort()).toEqual(['cola', 'soda']);
  });

  it('unlocks tier 2 at 2+ successful unlocks', () => {
    expect(getUnlockedBottles(2)).toEqual(expect.arrayContaining(['beer', 'bubble_tea']));
  });

  it('unlocks tier 3 at 5+', () => {
    expect(getUnlockedBottles(5)).toEqual(expect.arrayContaining(['wine_red', 'wine_white']));
  });

  it('unlocks tier 4 at 10+', () => {
    expect(getUnlockedBottles(10)).toEqual(expect.arrayContaining(['champagne', 'sake']));
  });

  it('unlocks whiskey at 20+', () => {
    expect(getUnlockedBottles(20)).toContain('whiskey');
  });
});

describe('pickBottleType', () => {
  it('only picks from unlocked pool', () => {
    for (let i = 0; i < 50; i++) {
      const bottle = pickBottleType(7, 0);
      expect(['cola', 'soda']).toContain(bottle);
    }
  });

  it('can pick higher tiers when unlocked', () => {
    const seen = new Set();
    for (let i = 0; i < 200; i++) seen.add(pickBottleType(14, 10));
    expect(seen.size).toBeGreaterThan(2);
  });
});

describe('countSuccessfulUnlocks', () => {
  it('counts only opened-bought and opened-tossed', () => {
    const items = [
      { status: 'locked' },
      { status: 'opened-bought' },
      { status: 'opened-tossed' },
      { status: 'shattered' },
      { status: 'opened-bought' },
    ];
    expect(countSuccessfulUnlocks(items)).toBe(3);
  });
});

describe('isFirstAppearance', () => {
  it('returns true when bottle type is not in existing items', () => {
    expect(isFirstAppearance('beer', [])).toBe(true);
    expect(isFirstAppearance('beer', [{ bottleType: 'cola' }])).toBe(true);
  });

  it('returns false when bottle type already exists', () => {
    expect(isFirstAppearance('beer', [{ bottleType: 'beer' }])).toBe(false);
  });
});

describe('BOTTLE_TYPES', () => {
  it('exports an emoji + label for every type', () => {
    const types = ['cola', 'soda', 'beer', 'bubble_tea', 'wine_red', 'wine_white', 'champagne', 'whiskey', 'sake'];
    for (const t of types) {
      expect(BOTTLE_TYPES[t]).toMatchObject({
        emoji: expect.any(String),
        label: expect.any(String),
      });
    }
  });
});
