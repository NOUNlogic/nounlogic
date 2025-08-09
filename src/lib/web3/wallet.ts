// Simple browser wallet integration for MetaMask/Ethereum
export async function connectWallet(): Promise<{ address: string } | { error: string }> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return { error: 'No browser wallet detected. Please install MetaMask or another wallet.' };
  }
  try {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || !accounts[0]) {
      return { error: 'No wallet address found.' };
    }
    return { address: accounts[0] };
  } catch (err: any) {
    return { error: err?.message || 'Wallet connection failed.' };
  }
}

export function isWalletAvailable(): boolean {
  return typeof window !== 'undefined' && !!(window as any).ethereum;
}
