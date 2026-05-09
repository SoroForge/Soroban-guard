# Soroban-guard

> **Safe upgrade framework for Soroban smart contracts** — enforced timelocks, multi-sig governance,
> migration compatibility checks, and one-command rollback support. The missing guard rails for
> Soroban production deployments.

<p align="center">
  <a href="https://github.com/SoroForge/soroban-upgrade-guard/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/SoroForge/soroban-upgrade-guard/actions/workflows/ci.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@soroban-upgrade-guard/sdk">
    <img alt="npm" src="https://img.shields.io/npm/v/@soroban-upgrade-guard/sdk?color=blue" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue" />
  </a>
  <a href="https://github.com/SoroForge/soroban-upgrade-guard/blob/main/CONTRIBUTING.md">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen" />
  </a>
  <img alt="Soroban" src="https://img.shields.io/badge/Soroban-Mainnet%20Ready-7B68EE" />
</p>

---

## Table of contents

- [The problem](#the-problem)
- [How it works](#how-it-works)
- [Architecture](#architecture)
- [Features](#features)
- [Packages](#packages)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Contract reference](#contract-reference)
- [Governance UI](#governance-ui)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## The problem

Soroban gives developers the ability to **upgrade** their deployed contracts — replace the running
WASM binary with a new version without changing the contract's address or state. This is powerful,
but it comes with serious risks that no existing tool addresses:

| Risk                                              | Impact                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| A single admin key can push any upgrade instantly | One compromised key = complete contract takeover                     |
| No mandatory delay between approval and execution | No time for users or auditors to review changes                      |
| No compatibility checks on new WASM               | Silent storage-schema breakage, removed functions, logic regressions |
| No standard rollback path                         | A bad upgrade can permanently brick a contract                       |

As Soroban DeFi TVL grows, these gaps become increasingly dangerous. **`soroban-upgrade-guard`
provides the guard rails that every production Soroban contract needs.**

---

## How it works

Every upgrade flows through a two-stage pipeline before touching a live contract:

```
                 ┌─────────────────────────────────────────────────────┐
  Council        │           GOVERNANCE CONTRACT                        │
  members  ───►  │  createProposal() → approve() → [APPROVED]          │
                 └──────────────────────┬──────────────────────────────┘
                                        │ queueUpgrade() — cross-contract call
                                        ▼
                 ┌─────────────────────────────────────────────────────┐
  Timelock       │           TIMELOCK CONTRACT                          │
  delay    ◄───  │  [PENDING] ──── N ledgers ────► [READY]             │
                 └──────────────────────┬──────────────────────────────┘
                                        │ executeUpgrade() — after delay
                                        ▼
                           ┌────────────────────────┐
                           │  Your production        │
                           │  Soroban contract       │
                           │  (WASM replaced)        │
                           └────────────────────────┘
```

Between each stage, anyone can inspect the new WASM hash, run migration checks, and cancel the
upgrade if something looks wrong. No upgrade reaches production without passing through both gates.

---

## Architecture

### Contracts (`/contracts`)

| Contract              | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `timelock`            | Records upgrade proposals and blocks execution until a configurable ledger delay has elapsed |
| `multisig-governance` | M-of-N council voting — prevents unilateral upgrades by a single key                         |
| `upgrade-proxy`       | Optional proxy pattern for zero-downtime upgrades with state migration hooks                 |

### SDK (`/sdk`)

| Package                      | Description                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `@soroban-upgrade-guard/sdk` | TypeScript SDK — deploy contracts, manage the upgrade pipeline, run migration checks |

### UI (`/ui`)

A governance dashboard built with React and Vite for non-technical council members to inspect, vote
on, and monitor upgrade proposals.

---

## Features

- **Timelock enforcement** — every upgrade must wait a configurable number of ledgers (default ≈ 24
  hours) between approval and execution. The delay is stored on-chain and cannot be bypassed.

- **Multi-sig governance** — configure an M-of-N council. A proposal only moves forward when M
  council members have voted to approve. No single private key can push an upgrade alone.

- **Pre-upgrade migration checks** — the SDK's `runMigrationChecks()` scans the new WASM for ABI
  breakage (removed or renamed public functions), storage schema changes, and runs a suite of
  simulated invocations before the upgrade is committed.

- **Cancellation at any stage** — any council member (or the admin key) can cancel a proposal at any
  point before execution. The state reverts cleanly.

- **Upgrade history & audit log** — every proposal, approval, rejection, and execution is recorded
  on-chain with timestamps, council member identities, and the WASM hash, forming a permanent,
  tamper-proof audit trail.

- **Governance UI** — a ready-made React dashboard that lets council members view open proposals,
  cast votes, and monitor the upgrade queue without writing a single line of code.

- **Composable** — each contract can be used standalone or together. Use just the timelock if you
  already have governance. Use just governance if you have a different delay mechanism.

---

## Packages

### `@soroban-upgrade-guard/sdk`

```bash
npm install @soroban-upgrade-guard/sdk @stellar/stellar-sdk
# or
pnpm add @soroban-upgrade-guard/sdk @stellar/stellar-sdk
```

---

## Getting started

### Prerequisites

| Tool        | Version |
| ----------- | ------- |
| Node.js     | ≥ 22    |
| pnpm        | ≥ 8     |
| Rust        | stable  |
| stellar-cli | latest  |

### Clone and install

```bash
git clone https://github.com/SoroForge/soroban-upgrade-guard.git
cd soroban-upgrade-guard
pnpm install
```

### Build

```bash
# TypeScript SDK + UI
pnpm build

# Soroban contracts
rustup target add wasm32-unknown-unknown
pnpm build:contracts
```

### Run tests

```bash
pnpm test           # TypeScript
pnpm test:contracts # Rust
```

---

## Usage

### Step 0 — Deploy the guard contracts

```typescript
import { UpgradeManager } from "@soroban-upgrade-guard/sdk";
import { Networks } from "@stellar/stellar-sdk";

const network = {
  network: "testnet" as const,
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: Networks.TESTNET,
};

// 1. Deploy timelock (24-hour delay ≈ 17,280 ledgers at 5s/ledger)
const timelockDeploy = await UpgradeManager.deployTimelock({
  network,
  admin: "GADMIN...",
  delayLedgers: 17_280,
});

// 2. Deploy governance (3-of-5 council)
const govDeploy = await UpgradeManager.deployGovernance({
  network,
  council: ["GCOUNCIL1...", "GCOUNCIL2...", "GCOUNCIL3...", "GCOUNCIL4...", "GCOUNCIL5..."],
  threshold: 3,
  timelockContractId: timelockDeploy.contractId,
});

const manager = new UpgradeManager({
  network,
  governance: { network, contractId: govDeploy.contractId },
  timelock: { network, contractId: timelockDeploy.contractId },
});
```

### Step 1 — Run migration checks on the new WASM

Before proposing an upgrade, verify the new binary is safe:

```typescript
const report = await manager.runMigrationChecks({
  targetContract: "GVAULT_CONTRACT_ID...",
  newWasmPath: "./target/wasm32-unknown-unknown/release/vault.wasm",
});

if (!report.allPassed) {
  console.error("Migration checks failed:");
  report.checks.filter((c) => !c.pass).forEach((c) => console.error(` ✗ ${c.name}: ${c.message}`));
  process.exit(1);
}

console.log("All checks passed. Safe to propose upgrade.");
```

### Step 2 — Create a governance proposal

```typescript
const proposalId = await manager.proposeUpgrade({
  proposer: "GCOUNCIL1...",
  targetContract: "GVAULT_CONTRACT_ID...",
  newWasmHash: report.wasmHash,
  description: "v1.1.0: Add configurable withdrawal limits and fix fee calculation",
});

console.log("Proposal created:", proposalId.toString());
```

### Step 3 — Council members vote

```typescript
// Each council member calls:
await manager.approveProposal(proposalId, "GCOUNCIL1...");
await manager.approveProposal(proposalId, "GCOUNCIL3...");
await manager.approveProposal(proposalId, "GCOUNCIL5...");
// Threshold of 3 reached → proposal moves to APPROVED
```

### Step 4 — Queue in the timelock

```typescript
// After approval threshold is reached:
await manager.queueUpgrade(proposalId);
// Proposal is now PENDING in timelock — must wait 17,280 ledgers (~24h)
```

### Step 5 — Execute after the delay

```typescript
// After the delay has passed:
const result = await manager.executeUpgrade(timelockProposalId);
console.log("Upgrade executed! Tx:", result.transactionHash);
```

### Cancel an upgrade at any time

```typescript
// Before the timelock delay expires:
await manager.cancelUpgrade(timelockProposalId);
```

---

## Contract reference

Detailed interface documentation lives in [`/docs`](./docs):

- [Architecture overview](./docs/architecture.md)
- [Timelock contract interface](./docs/timelock.md)
- [Governance contract interface](./docs/governance.md)
- [Upgrade proxy interface](./docs/upgrade-proxy.md)
- [Migration check guide](./docs/migration-checks.md)

---

## Governance UI

The `/ui` package contains a pre-built governance dashboard. To run it locally:

```bash
cd ui
pnpm dev
```

Set these environment variables in `ui/.env`:

```bash
VITE_GOVERNANCE_CONTRACT_ID=C...
VITE_TIMELOCK_CONTRACT_ID=C...
VITE_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
```

The UI shows:

- All open and past proposals with vote tallies
- A voting interface for connected council wallets (Freighter support)
- The live timelock queue with countdown timers
- The full on-chain upgrade audit log

---

## Roadmap

### v0.1 — Core contracts

- [ ] `timelock` contract: propose, execute, cancel
- [ ] `timelock` contract: configurable delay
- [ ] `multisig-governance` contract: council voting
- [ ] `multisig-governance` contract: proposal lifecycle
- [ ] TypeScript SDK: `deployTimelock()` and `deployGovernance()`
- [ ] TypeScript SDK: `proposeUpgrade()` / `approveProposal()` / `queueUpgrade()`

### v0.2 — Migration tooling

- [ ] `runMigrationChecks()`: ABI compatibility check
- [ ] `runMigrationChecks()`: storage schema diff
- [ ] `runMigrationChecks()`: simulated invocations on testnet fork
- [ ] CLI: `soroban-upgrade-guard check ./path/to.wasm --target CONTRACT_ID`

### v0.3 — Governance UI

- [ ] React governance dashboard
- [ ] Freighter wallet integration
- [ ] Proposal creation form
- [ ] Real-time vote tally with WebSocket updates

### v0.4 — Advanced patterns

- [ ] `upgrade-proxy` contract (zero-downtime upgrades)
- [ ] Rollback contracts: snapshot state before upgrade, restore on failure
- [ ] Third-party security audit of all contracts
- [ ] Mainnet launch

> Want to contribute? See [open issues](https://github.com/SoroForge/soroban-upgrade-guard/issues)
> and filter by `good first issue` or `help wanted`.

---

## Contributing

All contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development setup
- Commit conventions (Conventional Commits)
- PR guidelines
- How to write contract tests with `soroban-sdk` test utilities

---

## Security

Please do **not** report security vulnerabilities via GitHub issues. See
[SECURITY.md](./SECURITY.md) for responsible disclosure instructions.

> ⚠️ This project is pre-audit. Do not use for high-value production deployments until after v0.4
> ships with a completed third-party audit.

---

## License

MIT © YOUR_NAME — see [LICENSE](./LICENSE).
