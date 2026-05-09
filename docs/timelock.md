# Timelock Contract

## Overview

The timelock contract is the enforcement layer of the upgrade pipeline. It records
approved upgrade proposals and prevents execution until a mandatory delay — measured
in ledgers — has elapsed.

## Storage layout

| Key | Type | Description |
|---|---|---|
| `Proposal(id)` | `Proposal` | The stored upgrade proposal |
| `Delay` | `u32` | Timelock delay in ledgers |
| `Admin` | `Address` | Address allowed to propose and cancel |
| `ProposalCounter` | `u64` | Auto-incrementing proposal ID |

## Interface

| Function | Description |
|---|---|
| `initialize(admin, delay_ledgers)` | One-time setup |
| `propose_upgrade(target, wasm_hash)` | Record a new upgrade; returns proposal ID |
| `execute_upgrade(proposal_id)` | Execute after delay; reverts if too early |
| `cancel_upgrade(proposal_id)` | Admin cancels before delay elapses |
| `get_proposal(proposal_id)` | Read a proposal by ID |
| `delay()` | Return current delay in ledgers |
| `set_delay(new_delay)` | Update the delay (admin only) |

## Delay recommendation

| Delay | Ledgers (approx.) |
|---|---|
| 1 hour | ~720 |
| 24 hours | ~17,280 |
| 48 hours | ~34,560 |
| 7 days | ~120,960 |

Production deployments should use a minimum of 24 hours (17,280 ledgers).
