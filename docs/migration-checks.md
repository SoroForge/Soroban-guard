# Migration Checks

`runMigrationChecks()` scans a new WASM binary before an upgrade is proposed,
catching breaking changes before they reach production.

## Checks performed

| Check | Description | Severity |
|---|---|---|
| ABI compatibility | Detects removed or renamed public contract functions | 🔴 Error |
| Storage schema diff | Flags new, removed, or renamed storage keys | 🟠 Warning |
| Simulated invocations | Runs a suite of read-only calls against a testnet fork | 🔴 Error |
| WASM size regression | Warns if binary size increases by more than 20% | 🟡 Info |

## Usage

```typescript
const report = await manager.runMigrationChecks({
  targetContract: "CONTRACT_ID",
  newWasmPath: "./path/to/new_contract.wasm",
});

console.log(report.allPassed ? "✅ Safe to propose" : "❌ Fix issues first");

for (const check of report.checks) {
  const icon = check.pass ? "✅" : "❌";
  console.log(`${icon} ${check.name}${check.message ? ": " + check.message : ""}`);
}
```

## Sample output

```
✅ ABI compatibility: no removed functions
⚠️  Storage schema diff: key 'Config' type changed from u32 → u64 — ensure migration
✅ Simulated invocations: 12/12 passed
✅ WASM size: 42 KB → 44 KB (+4.7%)

All critical checks passed. Review warnings before proceeding.
```

## Limitations

- Storage schema diffing requires the contract to export its key types as part of the
  public ABI. If your contract does not do this, the check is skipped with a warning.
- Simulated invocations run against the current testnet state. Ensure the target
  contract is deployed on testnet before running checks.
