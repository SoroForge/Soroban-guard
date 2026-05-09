/**
 * History page — immutable on-chain audit log of all past upgrades.
 *
 * Columns: proposal ID, target contract, WASM hash, proposer,
 *          approval count, executed at (ledger + timestamp), status.
 *
 * TODO: implement once on-chain events are queryable via RPC.
 */
export function HistoryPage() {
  return (
    <div>
      <h2>Upgrade history</h2>
      {/* TODO: AuditLogTable component */}
    </div>
  );
}
