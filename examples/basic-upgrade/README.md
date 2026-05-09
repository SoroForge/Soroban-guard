# Example: Basic Upgrade

The simplest possible upgrade flow — a single admin key, 1-of-1 governance, and a short testnet
timelock delay.

## What it covers

- Deploying the timelock and governance contracts
- Running migration checks on a new WASM binary
- Creating an upgrade proposal
- Executing the upgrade after the delay

## Run

```bash
export STELLAR_SECRET=S...
export STELLAR_RPC_URL=https://soroban-testnet.stellar.org

pnpm --filter @examples/basic-upgrade start
```

> **Note:** This example will be fleshed out once `UpgradeManager.deployTimelock()` and
> `UpgradeManager.deployGovernance()` land in v0.1.
