//! # Upgrade Proxy Contract
//!
//! An optional proxy that sits in front of an upgradeable contract, enabling
//! zero-downtime upgrades with pre/post migration hooks.
//!
//! ## Proxy pattern
//!
//! ```text
//!  Caller
//!    │
//!    ▼
//! ┌─────────────────────┐
//! │    upgrade-proxy     │  ← stable address, never changes
//! │  (delegates calls)   │
//! └──────────┬──────────┘
//!            │ cross-contract call
//!            ▼
//! ┌─────────────────────┐
//! │  implementation v1   │  ← swapped out during upgrade
//! └─────────────────────┘
//! ```
//!
//! During an upgrade:
//! 1. `before_upgrade()` hook runs (e.g. pause the contract, snapshot state)
//! 2. Implementation address is updated to the new contract
//! 3. `after_upgrade()` hook runs (e.g. migrate storage, resume)

#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
pub enum DataKey {
    Implementation,
    Admin,
    Paused,
}

#[contract]
pub struct UpgradeProxyContract;

#[contractimpl]
impl UpgradeProxyContract {
    /// Initialise the proxy pointing at an initial implementation contract.
    pub fn initialize(env: Env, admin: Address, implementation: Address) {
        let _ = (env, admin, implementation);
        panic!("not implemented")
    }

    /// Return the current implementation address.
    pub fn implementation(env: Env) -> Address {
        let _ = env;
        panic!("not implemented")
    }

    /// Upgrade the implementation. Called by the timelock after delay elapses.
    ///
    /// Runs `before_upgrade` → swaps implementation → runs `after_upgrade`.
    pub fn upgrade(env: Env, new_implementation: Address) {
        let _ = (env, new_implementation);
        panic!("not implemented")
    }

    /// Pause all proxied calls (called automatically before an upgrade).
    pub fn pause(env: Env) {
        let _ = env;
        panic!("not implemented")
    }

    /// Resume proxied calls (called automatically after a successful upgrade).
    pub fn unpause(env: Env) {
        let _ = env;
        panic!("not implemented")
    }

    /// Returns true if the proxy is currently paused.
    pub fn is_paused(env: Env) -> bool {
        let _ = env;
        panic!("not implemented")
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn placeholder() {
        let _env = Env::default();
    }
}
