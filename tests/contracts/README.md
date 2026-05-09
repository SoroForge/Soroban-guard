# Contract Tests

Contract unit tests live inside each contract's `src/lib.rs` under `#[cfg(test)]`.
They use `soroban-sdk`'s built-in test utilities and require no live network.

## Run all contract tests

```bash
cd contracts
cargo test
```

## Run tests for a single contract

```bash
cd contracts
cargo test -p timelock
cargo test -p multisig-governance
cargo test -p upgrade-proxy
```

## Writing contract tests

```rust
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        env.mock_all_auths(); // mock signature verification
        let contract_id = env.register_contract(None, TimelockContract);
        let client = TimelockContractClient::new(&env, &contract_id);
        let admin = Address::generate(&env);
        client.initialize(&admin, &17_280_u32);
        assert_eq!(client.delay(), 17_280);
    }
}
```
