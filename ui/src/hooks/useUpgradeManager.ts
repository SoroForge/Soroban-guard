/**
 * useUpgradeManager
 *
 * React hook that initialises an UpgradeManager instance from the
 * environment variables defined in ui/.env and exposes it to components.
 *
 * Usage:
 * ```tsx
 * const { manager, isReady } = useUpgradeManager();
 * if (!isReady) return <Spinner />;
 * const proposalId = await manager.proposeUpgrade({ ... });
 * ```
 *
 * TODO: implement once UpgradeManager contracts are live.
 */
export function useUpgradeManager() {
  // TODO: read VITE_* env vars, construct NetworkConfig, return UpgradeManager
  return { manager: null, isReady: false };
}
