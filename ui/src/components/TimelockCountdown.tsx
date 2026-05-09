/**
 * TimelockCountdown
 *
 * Displays a live countdown to when a queued upgrade becomes executable,
 * based on the `executableAtLedger` field and the current ledger sequence.
 *
 * Converts ledger distance → seconds using the ~5 s average close time.
 *
 * TODO: implement using current ledger from Stellar RPC subscription.
 */
export function TimelockCountdown() {
  return (
    <div>
      {/* TODO: countdown timer — days / hours / minutes / seconds */}
    </div>
  );
}
