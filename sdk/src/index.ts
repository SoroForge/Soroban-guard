/**
 * @soroban-upgrade-guard/sdk
 *
 * Safe upgrade framework for Soroban smart contracts.
 * Timelocks, multi-sig governance, migration testing, and rollback support.
 *
 * @packageDocumentation
 */

export { UpgradeManager } from "./managers/UpgradeManager.js";

export type {
  DeployResult,
  ExecutionResult,
  GovernanceConfig,
  GovernanceProposal,
  GovernanceStatus,
  MigrationCheck,
  MigrationReport,
  NetworkConfig,
  ProposalStatus,
  StellarNetwork,
  TimelockConfig,
  UpgradeProposal,
} from "./types/index.js";

export const VERSION = "0.0.1";
