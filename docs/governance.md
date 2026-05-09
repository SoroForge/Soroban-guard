# Multisig Governance Contract

## Overview

The governance contract implements M-of-N council voting. A configurable number of council members
must approve an upgrade proposal before it can be forwarded to the timelock. No single private key
can push an upgrade unilaterally.

## Storage layout

| Key                | Type                 | Description                   |
| ------------------ | -------------------- | ----------------------------- |
| `Proposal(id)`     | `GovernanceProposal` | The stored proposal           |
| `Council`          | `Vec<Address>`       | Current council member list   |
| `Threshold`        | `u32`                | Minimum approvals needed      |
| `ProposalCounter`  | `u64`                | Auto-incrementing proposal ID |
| `TimelockContract` | `Address`            | Linked timelock contract      |

## Interface

| Function                                                    | Description                                      |
| ----------------------------------------------------------- | ------------------------------------------------ |
| `initialize(council, threshold, timelock)`                  | One-time setup                                   |
| `create_proposal(proposer, target, wasm_hash, description)` | Open a new proposal                              |
| `approve(council_member, proposal_id)`                      | Cast an approval vote                            |
| `reject(council_member, proposal_id)`                       | Cast a rejection vote                            |
| `queue_upgrade(proposal_id)`                                | Forward approved proposal to timelock            |
| `council()`                                                 | Return the current council                       |
| `add_council_member(new_member)`                            | Add a council member (requires council approval) |

## Proposal lifecycle

```
createProposal()
     │
     ▼
  [OPEN]  ◄── approve() / reject() from council members
     │
  threshold reached?
  ├── YES → [APPROVED] → queue_upgrade() → forwarded to timelock
  └── NO (+ expires_at passed) → [EXPIRED]
```
