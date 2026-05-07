import { describe, it, expect } from 'vitest';
import { computeUnlockAt, isReady, formatRemaining } from '../extension/lib/timer.js';

const DAY_MS = 24 * 60 * 60 * 1000;

describe('computeUnlockAt', () => {
  it('adds duration in days to lockedAt', () => {
    expect(computeUnlockAt(1000, 7)).toBe(1000 + 7 * DAY_MS);
  });
});

describe('isReady', () => {
  it('returns true when now >= unlockAt', () => {
    expect(isReady(2000, 1000)).toBe(true);
    expect(isReady(1000, 1000)).toBe(true);
  });
  it('returns false when now < unlockAt', () => {
    expect(isReady(500, 1000)).toBe(false);
  });
});

describe('formatRemaining', () => {
  it('shows days and hours when more than a day left', () => {
    const now = 0;
    const unlockAt = 2 * DAY_MS + 3 * 60 * 60 * 1000;
    expect(formatRemaining(now, unlockAt)).toBe('2d 3h');
  });
  it('shows hours and minutes when less than a day', () => {
    const now = 0;
    const unlockAt = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    expect(formatRemaining(now, unlockAt)).toBe('5h 30m');
  });
  it('returns "ready" when time has passed', () => {
    expect(formatRemaining(1000, 500)).toBe('ready');
  });
});
