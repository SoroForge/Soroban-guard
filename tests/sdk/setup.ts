/**
 * Global test setup for @soroban-guard/sdk unit tests.
 *
 * Add shared mocks, constants, or helper factories here.
 * This file is run once before each test suite.
 */

/** Shared testnet network config for use in tests. */
export const TEST_NETWORK_CONFIG = {
  network: "testnet" as const,
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
};
