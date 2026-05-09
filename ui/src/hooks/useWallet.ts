/**
 * useWallet
 *
 * React hook for connecting to a Stellar wallet (Freighter) from the
 * governance dashboard.
 *
 * Returns:
 * - publicKey    — connected account's public key (null if not connected)
 * - connect()    — prompt wallet connection
 * - disconnect() — clear wallet session
 * - isConnected  — boolean connection state
 *
 * TODO: implement using FreighterAdapter once wallet-adapter is wired in.
 */
export function useWallet() {
  return {
    publicKey: null as string | null,
    isConnected: false,
    connect: async () => {
      throw new Error("useWallet.connect() — not yet implemented");
    },
    disconnect: async () => {
      throw new Error("useWallet.disconnect() — not yet implemented");
    },
  };
}
