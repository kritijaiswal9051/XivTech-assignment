import { useSelector } from "react-redux";
import type { RootState } from "./store";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 1rem;
  background: #fff;
  color: #222;
  border-radius: 8px;
  overflow: hidden;
  @media (max-width: 900px) {
    font-size: 0.85rem;
  }
`;
const Th = styled.th`
  padding: 0.75rem 0.5rem;
  background: #f5f5f5;
  font-weight: 600;
  color: #222;
`;
const Td = styled.td`
  padding: 0.75rem 0.5rem;
  text-align: center;
  border-bottom: 1px solid #eee;
  color: #222;
`;
const Logo = styled.img`
  width: 32px;
  height: 32px;
`;
const Percent = styled.span<{ positive: boolean }>`
  color: ${({ positive }) => (positive ? "#16c784" : "#ea3943")};
  font-weight: 500;
`;
const Chart = styled.svg`
  width: 80px;
  height: 32px;
`;

const CryptoTable = () => {
  const assets = useSelector((state: RootState) => state.crypto.assets);

  return (
    <Table>
      <thead>
        <tr>
          <Th>#</Th>
          <Th>Logo</Th>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>Price</Th>
          <Th>1h %</Th>
          <Th>24h %</Th>
          <Th>7d %</Th>
          <Th>Market Cap</Th>
          <Th>24h Volume</Th>
          <Th>Circulating Supply</Th>
          <Th>Max Supply</Th>
          <Th>7D Chart</Th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset, idx) => (
          <tr key={asset.id}>
            <Td data-label="#">{idx + 1}</Td>
            <Td data-label="Logo">
              <Logo src={asset.logo} alt={asset.symbol} />
            </Td>
            <Td data-label="Name">{asset.name}</Td>
            <Td data-label="Symbol">{asset.symbol}</Td>
            <Td data-label="Price">
              $
              {asset.price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Td>
            <Td data-label="1h %">
              <Percent positive={asset.percentChange1h >= 0}>
                {asset.percentChange1h >= 0 ? "▲" : "▼"}
                {Math.abs(asset.percentChange1h).toFixed(2)}%
              </Percent>
            </Td>
            <Td data-label="24h %">
              <Percent positive={asset.percentChange24h >= 0}>
                {asset.percentChange24h >= 0 ? "▲" : "▼"}
                {Math.abs(asset.percentChange24h).toFixed(2)}%
              </Percent>
            </Td>
            <Td data-label="7d %">
              <Percent positive={asset.percentChange7d >= 0}>
                {asset.percentChange7d >= 0 ? "▲" : "▼"}
                {Math.abs(asset.percentChange7d).toFixed(2)}%
              </Percent>
            </Td>
            <Td data-label="Market Cap">${asset.marketCap.toLocaleString()}</Td>
            <Td data-label="24h Volume">${asset.volume24h.toLocaleString()}</Td>
            <Td data-label="Circulating Supply">
              {asset.circulatingSupply.toLocaleString()} {asset.symbol}
            </Td>
            <Td data-label="Max Supply">
              {asset.maxSupply ? asset.maxSupply.toLocaleString() : "-"}
            </Td>
            <Td data-label="7D Chart">
              <Chart viewBox="0 0 80 32">
                {asset.chart7d.map((v, i, arr) =>
                  i === 0 ? null : (
                    <polyline
                      key={i}
                      fill="none"
                      stroke="#16c784"
                      strokeWidth="2"
                      points={`
                        ${(i - 1) * 13},${
                        32 -
                        ((arr[i - 1] - Math.min(...arr)) /
                          (Math.max(...arr) - Math.min(...arr) + 1e-6)) *
                          28
                      }
                        ,${i * 13},${
                        32 -
                        ((v - Math.min(...arr)) /
                          (Math.max(...arr) - Math.min(...arr) + 1e-6)) *
                          28
                      }
                      `}
                    />
                  )
                )}
              </Chart>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptoTable;
