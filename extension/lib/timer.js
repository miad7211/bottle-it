// Time math for the cooling-off periods.
// All times are in milliseconds since 1970 (the "Unix epoch") — JS standard.

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MIN_MS = 60 * 1000;

export function computeUnlockAt(lockedAt, durationDays) {
  return lockedAt + durationDays * DAY_MS;
}

export function isReady(now, unlockAt) {
  return now >= unlockAt;
}

export function formatRemaining(now, unlockAt) {
  const ms = unlockAt - now;
  if (ms <= 0) return 'ready';

  if (ms >= DAY_MS) {
    const days = Math.floor(ms / DAY_MS);
    const hours = Math.floor((ms % DAY_MS) / HOUR_MS);
    return `${days}d ${hours}h`;
  }

  const hours = Math.floor(ms / HOUR_MS);
  const mins = Math.floor((ms % HOUR_MS) / MIN_MS);
  return `${hours}h ${mins}m`;
}
