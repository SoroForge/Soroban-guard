/**
 * Shared utility helpers for @soroban-upgrade-guard/sdk.
 *
 * Add pure, stateless helper functions here (e.g. WASM hash computation,
 * ledger-to-time estimates, XDR helpers).
 */

/**
 * Estimate how many seconds a given number of ledgers represents.
 * Uses the Stellar network's ~5-second average ledger close time.
 */
export function ledgersToSeconds(ledgers: number): number {
  return ledgers * 5;
}

/**
 * Estimate how many ledgers correspond to a given number of hours.
 */
export function hoursToLedgers(hours: number): number {
  return Math.ceil((hours * 3600) / 5);
}
