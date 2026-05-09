#!/usr/bin/env bash
# =============================================================================
# verify.sh — Verify deployed contract state on a Stellar network
# =============================================================================
#
# Reads the deployed contract IDs from the environment and checks that
# the contracts are correctly initialised and reachable.
#
# Usage:
#   TIMELOCK_CONTRACT_ID=C... GOVERNANCE_CONTRACT_ID=C... \
#   STELLAR_RPC_URL=https://soroban-testnet.stellar.org \
#   ./scripts/verify.sh
# =============================================================================

set -euo pipefail

if [[ -z "${TIMELOCK_CONTRACT_ID:-}" || -z "${GOVERNANCE_CONTRACT_ID:-}" ]]; then
  echo "Error: TIMELOCK_CONTRACT_ID and GOVERNANCE_CONTRACT_ID must be set."
  exit 1
fi

echo "Verifying timelock:    $TIMELOCK_CONTRACT_ID"
echo "Verifying governance:  $GOVERNANCE_CONTRACT_ID"

# TODO: use stellar-cli to read contract state and verify
# stellar contract invoke --id "$TIMELOCK_CONTRACT_ID" -- delay
# stellar contract invoke --id "$GOVERNANCE_CONTRACT_ID" -- council

echo ""
echo "TODO: complete verification steps in scripts/verify.sh"
