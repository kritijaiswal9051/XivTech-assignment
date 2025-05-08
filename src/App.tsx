import CryptoTable from "./CryptoTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssets } from "./cryptoSlice";
import type { RootState } from "./store";

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const App = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.crypto.assets);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = assets.map((asset) => {
        // Simulate price and % changes
        const priceChange = getRandom(-0.5, 0.5) * asset.price * 0.01;
        const newPrice = Math.max(asset.price + priceChange, 0.01);
        const percentChange1h = getRandom(-1, 1);
        const percentChange24h = getRandom(-2, 2);
        const percentChange7d = getRandom(-5, 5);
        const volume24h = Math.max(
          asset.volume24h + getRandom(-0.05, 0.05) * asset.volume24h,
          0
        );
        // Simulate 7d chart
        const chart7d = [...asset.chart7d.slice(1), newPrice];
        return {
          ...asset,
          price: newPrice,
          percentChange1h,
          percentChange24h,
          percentChange7d,
          volume24h,
          chart7d,
        };
      });
      dispatch(setAssets(updated));
    }, 1500);
    return () => clearInterval(interval);
  }, [assets, dispatch]);

  return (
    <div>
      <h1>Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
};
export default App;
