export const ETHEREUM_REQUEST_METHODS = {
  ETH_REQUEST_ACCOUNTS: "eth_requestAccounts",
  ETH_CHAIN_ID: "eth_chainId",
  SWITCH_NETWORK: "wallet_switchEthereumChain",
  ADD_NETWORK: "wallet_addEthereumChain",
  ETH_GET_BALANCE: "eth_getBalance",
  ETH_CALL: "eth_call",
} as const;

export const UNRECOGNIZED_NETWORK_ERROR_CODE = 4902;
