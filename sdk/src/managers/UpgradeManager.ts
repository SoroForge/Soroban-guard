import type {
  DeployResult,
  ExecutionResult,
  GovernanceConfig,
  GovernanceProposal,
  MigrationReport,
  NetworkConfig,
  TimelockConfig,
  UpgradeProposal,
} from "../types/index.js";

/**
 * `UpgradeManager` orchestrates the full safe-upgrade pipeline:
 *
 * 1. **Propose** → governance council votes on the upgrade
 * 2. **Queue**   → approved proposal enters the timelock delay
 * 3. **Execute** → upgrade goes live after the delay expires
 *
 * @example
 * ```typescript
 * import { UpgradeManager } from "@soroban-upgrade-guard/sdk";
 *
 * const manager = new UpgradeManager({
 *   network: { network: "testnet", rpcUrl: "...", networkPassphrase: "..." },
 *   governance: { contractId: "GOVERNANCE_CONTRACT_ID" },
 *   timelock: { contractId: "TIMELOCK_CONTRACT_ID" },
 * });
 *
 * const proposalId = await manager.proposeUpgrade({
 *   targetContract: "CONTRACT_TO_UPGRADE",
 *   newWasmHash: "abc123...",
 *   description: "Add spending limits to vault contract",
 * });
 * ```
 */
// eslint-disable-next-line @typescript-eslint/require-await
export class UpgradeManager {
  readonly network: NetworkConfig;
  readonly governanceConfig: GovernanceConfig;
  readonly timelockConfig: TimelockConfig;

  constructor(opts: {
    network: NetworkConfig;
    governance: GovernanceConfig;
    timelock: TimelockConfig;
  }) {
    this.network = opts.network;
    this.governanceConfig = opts.governance;
    this.timelockConfig = opts.timelock;
  }

  // ---------------------------------------------------------------------------
  // Deployment
  // ---------------------------------------------------------------------------

  /**
   * Deploy the governance contract.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  static async deployGovernance(_opts: {
    network: NetworkConfig;
    council: string[];
    threshold: number;
    timelockContractId: string;
  }): Promise<DeployResult> {
    throw new Error("deployGovernance() — not yet implemented");
  }

  /**
   * Deploy the timelock contract.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  static async deployTimelock(_opts: {
    network: NetworkConfig;
    admin: string;
    delayLedgers: number;
  }): Promise<DeployResult> {
    throw new Error("deployTimelock() — not yet implemented");
  }

  // ---------------------------------------------------------------------------
  // Governance
  // ---------------------------------------------------------------------------

  /**
   * Create an upgrade proposal in the governance contract.
   *
   * Returns the proposal ID.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async proposeUpgrade(_opts: {
    proposer: string;
    targetContract: string;
    newWasmHash: string;
    description: string;
  }): Promise<bigint> {
    throw new Error("proposeUpgrade() — not yet implemented");
  }

  /**
   * Cast an approval vote on a governance proposal.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async approveProposal(_proposalId: bigint, _councilMember: string): Promise<ExecutionResult> {
    throw new Error("approveProposal() — not yet implemented");
  }

  /**
   * Cast a rejection vote on a governance proposal.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async rejectProposal(_proposalId: bigint, _councilMember: string): Promise<ExecutionResult> {
    throw new Error("rejectProposal() — not yet implemented");
  }

  /**
   * Once a proposal has enough approvals, queue it in the timelock.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async queueUpgrade(_proposalId: bigint): Promise<ExecutionResult> {
    throw new Error("queueUpgrade() — not yet implemented");
  }

  /**
   * Return an on-chain governance proposal by ID.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getGovernanceProposal(_proposalId: bigint): Promise<GovernanceProposal> {
    throw new Error("getGovernanceProposal() — not yet implemented");
  }

  // ---------------------------------------------------------------------------
  // Timelock
  // ---------------------------------------------------------------------------

  /**
   * Execute an upgrade after the timelock delay has passed.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async executeUpgrade(_timelockProposalId: bigint): Promise<ExecutionResult> {
    throw new Error("executeUpgrade() — not yet implemented");
  }

  /**
   * Cancel a pending timelock proposal (admin only, before delay expires).
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async cancelUpgrade(_timelockProposalId: bigint): Promise<ExecutionResult> {
    throw new Error("cancelUpgrade() — not yet implemented");
  }

  /**
   * Return a timelock proposal by ID.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTimelockProposal(_proposalId: bigint): Promise<UpgradeProposal> {
    throw new Error("getTimelockProposal() — not yet implemented");
  }

  // ---------------------------------------------------------------------------
  // Migration testing
  // ---------------------------------------------------------------------------

  /**
   * Run a series of pre-upgrade migration checks against a new WASM binary.
   *
   * Checks include:
   * - ABI compatibility (no removed public functions)
   * - Storage schema migration (key changes flagged)
   * - Simulated test invocations on a fork
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async runMigrationChecks(_opts: {
    targetContract: string;
    newWasmPath: string;
  }): Promise<MigrationReport> {
    throw new Error("runMigrationChecks() — not yet implemented");
  }
}
