# Architecture

> **Status:** Work in progress — updated as the project evolves.

## Overview

`soroban-guard` is a monorepo with three layers:

| Layer              | Location     | Language           |
| ------------------ | ------------ | ------------------ |
| On-chain contracts | `/contracts` | Rust (Soroban)     |
| TypeScript SDK     | `/sdk`       | TypeScript         |
| Governance UI      | `/ui`        | React + TypeScript |

## Upgrade pipeline

Every upgrade flows through two mandatory gates before reaching a live contract:

```
                ┌───────────────────────────────────────┐
  Council       │      multisig-governance contract      │
  vote    ─────►│  createProposal → approve → [APPROVED] │
                └──────────────────┬────────────────────┘
                                   │ queueUpgrade()
                                   ▼
                ┌───────────────────────────────────────┐
  Timelock      │          timelock contract             │
  delay   ◄─────│  [PENDING] ── N ledgers ── [READY]    │
                └──────────────────┬────────────────────┘
                                   │ executeUpgrade()
                                   ▼
                       ┌─────────────────────┐
                       │  Your Soroban        │
                       │  contract (upgraded) │
                       └─────────────────────┘
```

## Contract responsibilities

| Contract              | Single responsibility                                         |
| --------------------- | ------------------------------------------------------------- |
| `timelock`            | Record proposals; block execution until delay elapses; cancel |
| `multisig-governance` | M-of-N council voting; forward approved proposals to timelock |
| `upgrade-proxy`       | Optional stable address; pre/post migration hooks             |

## Key design decisions

<!-- Document significant technical decisions here as they are made -->

| Decision | Rationale |
| -------- | --------- |
| _TBD_    | _TBD_     |

## Adding a new contract

1. Create `contracts/<name>/` with `Cargo.toml` and `src/lib.rs`
2. Add it to `contracts/Cargo.toml` `[workspace] members`
3. Expose its interface in `sdk/src/`
4. Document it in `docs/`
