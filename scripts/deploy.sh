#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Deploy soroban-upgrade-guard contracts to a Stellar network
# =============================================================================
#
# Usage:
#   ./scripts/deploy.sh [testnet|mainnet|futurenet]
#
# Required environment variables:
#   STELLAR_SECRET   — Secret key of the deployer / admin account (funded)
#   STELLAR_RPC_URL  — Soroban RPC endpoint
#
# Optional:
#   TIMELOCK_DELAY_LEDGERS — default 17280 (~24 h on testnet)
#   GOVERNANCE_THRESHOLD   — default 3 (requires COUNCIL_MEMBERS to be set)
#   COUNCIL_MEMBERS        — space-separated list of council public keys
#
# Example:
#   STELLAR_SECRET=S... COUNCIL_MEMBERS="G... G... G..." ./scripts/deploy.sh testnet
# =============================================================================

set -euo pipefail

NETWORK="${1:-testnet}"
TIMELOCK_DELAY="${TIMELOCK_DELAY_LEDGERS:-17280}"
THRESHOLD="${GOVERNANCE_THRESHOLD:-3}"

# ---------------------------------------------------------------------------
# Validate inputs
# ---------------------------------------------------------------------------

if [[ -z "${STELLAR_SECRET:-}" ]]; then
  echo "Error: STELLAR_SECRET is not set."
  exit 1
fi

if [[ -z "${STELLAR_RPC_URL:-}" ]]; then
  echo "Error: STELLAR_RPC_URL is not set."
  exit 1
fi

echo "Network:        $NETWORK"
echo "RPC:            $STELLAR_RPC_URL"
echo "Timelock delay: $TIMELOCK_DELAY ledgers"
echo "Gov threshold:  $THRESHOLD"

# ---------------------------------------------------------------------------
# Build contracts
# ---------------------------------------------------------------------------

echo ""
echo "Building Soroban contracts..."
(cd contracts && cargo build --target wasm32-unknown-unknown --release)

WASM_DIR="contracts/target/wasm32-unknown-unknown/release"

# ---------------------------------------------------------------------------
# TODO: Upload WASMs and deploy contracts
# ---------------------------------------------------------------------------
# 1. Upload timelock WASM
# stellar contract upload --wasm "$WASM_DIR/timelock.wasm" ...
#
# 2. Deploy timelock
# stellar contract deploy --wasm-hash <hash> ...
#
# 3. Initialize timelock
# stellar contract invoke --id <timelock_id> -- initialize ...
#
# 4. Upload + deploy governance contract
# stellar contract upload --wasm "$WASM_DIR/multisig_governance.wasm" ...
# stellar contract deploy --wasm-hash <hash> ...
#
# 5. Initialize governance with council members
# stellar contract invoke --id <gov_id> -- initialize ...
# ---------------------------------------------------------------------------

echo ""
echo "TODO: complete deployment steps in scripts/deploy.sh"
echo "See: https://developers.stellar.org/docs/tools/developer-tools/cli/stellar-cli"
