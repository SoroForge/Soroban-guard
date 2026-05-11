# Contributing to soroban-guard

Thank you for contributing to `soroban-guard`! This guide covers everything you need to get started.

---


## Getting started

### Prerequisites

- **Node.js ≥ 22** and **pnpm ≥ 8**
- **Rust stable** + `wasm32-unknown-unknown` target
- **stellar-cli**: `cargo install --locked stellar-cli --features opt`

### Setup

```bash
git clone https://github.com/YOUR_FORK/soroban-guard.git
cd soroban-guard
pnpm install
rustup target add wasm32-unknown-unknown
pnpm build
```

---

## Development workflow

1. Create a branch:

   ```
   feat/timelock-configurable-delay
   fix/governance-vote-replay
   docs/migration-guide
   ```

2. Run all checks before pushing:

   ```bash
   pnpm lint && pnpm typecheck && pnpm test && pnpm test:contracts
   ```

3. Open a PR against `main`.

---

## Commit conventions

Format: `<type>(<scope>): <description>`

**Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `chore`, `contract`, `security`

**Scopes**: `sdk`, `ui`, `timelock`, `multisig-governance`, `upgrade-proxy`, `docs`, `examples`,
`ci`, `deps`

**Examples**:

```
contract(timelock): implement execute_upgrade() with delay validation
feat(sdk): add UpgradeManager.runMigrationChecks()
fix(governance): prevent double-vote by same council member
docs(ui): add governance dashboard setup instructions
security(timelock): add overflow check on executable_at calculation
```

---

## Testing

### TypeScript SDK

```bash
pnpm test               # all SDK tests
pnpm test:coverage      # with coverage report
```

### Soroban contracts

```bash
cd contracts && cargo test
```

Contract tests run in a simulated Soroban environment — no network needed.

When writing new contract tests, use the `soroban-sdk` testutils:

```rust
use soroban_sdk::{testutils::Address as _, Env};
let env = Env::default();
env.mock_all_auths(); // mock signature verification
```

### Security audit check

```bash
cd contracts && cargo audit   # known Rust CVEs
pnpm audit                    # known npm CVEs
```

---

## Good first issues

Look for issues labelled:

- `good first issue` — suitable for newcomers
- `help wanted` — any contributor can pick up
- `contract` — Rust / Soroban contract work
- `sdk` — TypeScript SDK work
- `ui` — React governance dashboard work

---

Questions? Open a [Discussion](https://github.com/SoroForge/soroban-guard/discussions).
