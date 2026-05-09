//! # Timelock Contract
//!
//! Enforces a mandatory delay between when an upgrade is *proposed* and when
//! it can be *executed*. This gives users and the community time to inspect
//! the new WASM before it goes live, and to exit if they disagree with the change.
//!
//! ## Upgrade lifecycle
//!
//! ```text
//!  propose_upgrade()          execute_upgrade()
//!        │                          │
//!        ▼                          ▼
//!   [PENDING] ──── delay ────► [READY] ──────► [EXECUTED]
//!        │                                          ▲
//!        └────────── cancel_upgrade() ──────────────┘
//!                        (before READY)
//! ```
//!
//! ## Storage keys
//!
//! | Key                    | Type             | Description                          |
//! |------------------------|------------------|--------------------------------------|
//! | `Proposal(id)`         | `Proposal`       | The upgrade proposal struct           |
//! | `Delay`                | `u32`            | Timelock delay in ledgers             |
//! | `Admin`                | `Address`        | Address allowed to propose/cancel     |
//! | `ProposalCounter`      | `u64`            | Auto-incrementing proposal ID         |

#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Bytes, Env};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ProposalStatus {
    Pending,
    Ready,
    Executed,
    Cancelled,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Proposal {
    /// The WASM hash of the new contract code.
    pub new_wasm_hash: Bytes,
    /// Ledger sequence at which this proposal becomes executable.
    pub executable_at: u32,
    /// Current status of the proposal.
    pub status: ProposalStatus,
    /// Address of the contract to upgrade.
    pub target_contract: Address,
}

#[contracttype]
pub enum DataKey {
    Proposal(u64),
    Delay,
    Admin,
    ProposalCounter,
}

// ---------------------------------------------------------------------------
// Contract
// ---------------------------------------------------------------------------

#[contract]
pub struct TimelockContract;

#[contractimpl]
impl TimelockContract {
    /// Initialise the timelock with an admin and a delay (in ledgers).
    ///
    /// A delay of ~17,280 ledgers ≈ 24 hours (5-second average ledger time).
    pub fn initialize(env: Env, admin: Address, delay_ledgers: u32) {
        let _ = (env, admin, delay_ledgers);
        panic!("not implemented")
    }

    /// Propose an upgrade. Records the proposal with an `executable_at` timestamp.
    ///
    /// Returns the proposal ID.
    pub fn propose_upgrade(
        env: Env,
        target_contract: Address,
        new_wasm_hash: Bytes,
    ) -> u64 {
        let _ = (env, target_contract, new_wasm_hash);
        panic!("not implemented")
    }

    /// Execute an upgrade after the timelock delay has passed.
    ///
    /// Reverts if the delay has not elapsed or the proposal was cancelled.
    pub fn execute_upgrade(env: Env, proposal_id: u64) {
        let _ = (env, proposal_id);
        panic!("not implemented")
    }

    /// Cancel a pending proposal (admin only, before it becomes executable).
    pub fn cancel_upgrade(env: Env, proposal_id: u64) {
        let _ = (env, proposal_id);
        panic!("not implemented")
    }

    /// Return a proposal by ID.
    pub fn get_proposal(env: Env, proposal_id: u64) -> Proposal {
        let _ = (env, proposal_id);
        panic!("not implemented")
    }

    /// Return the current timelock delay in ledgers.
    pub fn delay(env: Env) -> u32 {
        let _ = env;
        panic!("not implemented")
    }

    /// Update the timelock delay (admin only).
    ///
    /// The new delay takes effect on the next proposal; existing proposals are
    /// not affected.
    pub fn set_delay(env: Env, new_delay: u32) {
        let _ = (env, new_delay);
        panic!("not implemented")
    }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn placeholder() {
        let _env = Env::default();
    }
}
