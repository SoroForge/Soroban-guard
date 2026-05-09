# Example: Governance Upgrade

A full 3-of-5 council governance flow with a 24-hour timelock on Testnet.

## What it covers

- Deploying governance (3-of-5) + timelock (17,280 ledger delay)
- Council member 1 creates a proposal
- Three council members vote to approve
- Proposal is queued in the timelock
- Upgrade is executed after the delay
- Verifying the new contract WASM hash on-chain

## Run

```bash
# Provide 5 funded testnet keypairs
export COUNCIL_1_SECRET=S...
export COUNCIL_2_SECRET=S...
export COUNCIL_3_SECRET=S...
export STELLAR_RPC_URL=https://soroban-testnet.stellar.org

pnpm --filter @examples/governance-upgrade start
```

> **Note:** This example will be fleshed out once council voting is
> fully implemented in v0.2.
