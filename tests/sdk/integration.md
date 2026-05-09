# Integration Tests

Integration tests require deployed contracts on Stellar Testnet.

## Running locally

```bash
export STELLAR_NETWORK=testnet
export STELLAR_RPC_URL=https://soroban-testnet.stellar.org
export STELLAR_SECRET=S...         # funded testnet keypair
export TIMELOCK_CONTRACT_ID=C...   # deployed timelock
export GOVERNANCE_CONTRACT_ID=C... # deployed governance

pnpm test:integration
```

Integration tests are skipped in CI unless `STELLAR_NETWORK` is set.
Run them manually before cutting a release.
