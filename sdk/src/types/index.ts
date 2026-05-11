/**
 * Core types for @soroban-guard/sdk.
 */

export type StellarNetwork = "mainnet" | "testnet" | "futurenet" | "standalone";

export interface NetworkConfig {
  network: StellarNetwork;
  rpcUrl: string;
  networkPassphrase: string;
}

// ---------------------------------------------------------------------------
// Timelock
// ---------------------------------------------------------------------------

export type ProposalStatus = "pending" | "ready" | "executed" | "cancelled";

export interface UpgradeProposal {
  id: bigint;
  targetContract: string;
  newWasmHash: string;
  executableAtLedger: number;
  status: ProposalStatus;
}

export interface TimelockConfig {
  network: NetworkConfig;
  /** Deployed timelock contract ID */
  contractId: string;
}

// ---------------------------------------------------------------------------
// Governance
// ---------------------------------------------------------------------------

export type GovernanceStatus = "open" | "approved" | "rejected" | "expired";

export interface GovernanceProposal {
  id: bigint;
  proposer: string;
  targetContract: string;
  newWasmHash: string;
  description: string;
  status: GovernanceStatus;
  approvals: string[];
  rejections: string[];
  createdAtLedger: number;
  expiresAtLedger: number;
}

export interface GovernanceConfig {
  network: NetworkConfig;
  /** Deployed governance contract ID */
  contractId: string;
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

export interface MigrationCheck {
  name: string;
  pass: boolean;
  message?: string;
}

export interface MigrationReport {
  wasmHash: string;
  checks: MigrationCheck[];
  allPassed: boolean;
  generatedAt: Date;
}

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

export interface ExecutionResult {
  success: boolean;
  transactionHash: string;
  ledger?: number;
  error?: string;
}

export interface DeployResult {
  contractId: string;
  transactionHash: string;
}
