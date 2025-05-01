import { Eip1193Provider, BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider & BrowserProvider;
  }
}

export {};
