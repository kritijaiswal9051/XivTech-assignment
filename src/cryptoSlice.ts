import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import bitcoinLogo from "./assets/bitcoin-btc-logo.svg";
import ethereumLogo from "./assets/ethereum.svg";
import tetherLogo from "./assets/tether.svg";
import xrpLogo from "./assets/xrp.svg";
import bnbLogo from "./assets/bnb.svg";

export type CryptoAsset = {
  id: string;
  name: string;
  symbol: string;
  logo: string; // URL or SVG path
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chart7d: number[]; // For static chart
};

export type CryptoState = {
  assets: CryptoAsset[];
};

const initialState: CryptoState = {
  assets: [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      logo: bitcoinLogo,
      price: 93759.48,
      percentChange1h: 0.43,
      percentChange24h: 0.93,
      percentChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      chart7d: [90000, 91000, 92000, 93000, 94000, 95000, 93759],
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      logo: ethereumLogo,
      price: 1802.46,
      percentChange1h: 0.6,
      percentChange24h: 3.21,
      percentChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      chart7d: [1700, 1720, 1750, 1780, 1800, 1820, 1802],
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      logo: tetherLogo,
      price: 1.0,
      percentChange1h: 0.0,
      percentChange24h: 0.0,
      percentChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      chart7d: [1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: "xrp",
      name: "XRP",
      symbol: "XRP",
      logo: xrpLogo,
      price: 2.22,
      percentChange1h: 0.46,
      percentChange24h: 0.54,
      percentChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      chart7d: [2, 2.1, 2.15, 2.18, 2.2, 2.22, 2.22],
    },
    {
      id: "bnb",
      name: "BNB",
      symbol: "BNB",
      logo: bnbLogo,
      price: 606.65,
      percentChange1h: 0.09,
      percentChange24h: -1.2,
      percentChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      chart7d: [590, 595, 600, 605, 610, 615, 606],
    },
  ],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateAsset(state, action: PayloadAction<CryptoAsset>) {
      const idx = state.assets.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) {
        state.assets[idx] = action.payload;
      }
    },
    setAssets(state, action: PayloadAction<CryptoAsset[]>) {
      state.assets = action.payload;
    },
  },
});

export const { updateAsset, setAssets } = cryptoSlice.actions;
export default cryptoSlice.reducer;
