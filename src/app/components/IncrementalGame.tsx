import React, { useState } from 'react';
import styles from './IncrementalGame.module.css';

const IncrementalGame: React.FC = () => {
  const [money, setMoney] = useState(0);
  const [assetCounts, setAssetCounts] = useState([0, 0, 0]);
  const [progressBars, setProgressBars] = useState([false, false, false]);
  
  const assetPrices = [10, 20, 30];
  const assetReturns = [2, 5, 10];

  const incrementMoney = () => {
    setMoney(money + 1);
  };

  const purchaseAsset = (assetIndex: number) => {
    const cost = assetPrices[assetIndex - 1];
    if (money >= cost) {
      setMoney(money - cost);
      const newAssetCounts = [...assetCounts];
      newAssetCounts[assetIndex - 1]++;
      setAssetCounts(newAssetCounts);
      updateAssetPrice(assetIndex);
      updateAssetReturnDisplay(assetIndex);
      updateAssetProfitDisplay(assetIndex);

      if (!progressBars[assetIndex - 1]) {
        startAssetProgress(assetIndex);
        const newProgressBars = [...progressBars];
        newProgressBars[assetIndex - 1] = true;
        setProgressBars(newProgressBars);
      }
    }
  };

  const updateAssetPrice = (assetIndex: number) => {
    assetPrices[assetIndex - 1] = 10 + 10 ** (assetCounts[assetIndex - 1] / 10);
  };

  const updateAssetReturnDisplay = (assetIndex: number) => {
    document.getElementById(`asset${assetIndex}-return`)!.textContent = `+${assetReturns[assetIndex - 1]}`;
  };

  const updateAssetProfitDisplay = (assetIndex: number) => {
    const profit = assetReturns[assetIndex - 1] * assetCounts[assetIndex - 1];
    document.getElementById(`asset${assetIndex}-profit`)!.textContent = `Profit: $${profit.toFixed(2)}`;
  };

  const incrementMoneyOnReset = (assetCount: number) => {
    const reward = assetCount * 2;
    setMoney(money + reward);
  };

  const startAssetProgress = (assetIndex: number) => {
    const progressBar = document.getElementById(`asset${assetIndex}-progress`)!;
    let width = 0;
  
    const interval = setInterval(() => {
      if (width >= 100) {
        width = 0;
        progressBar.style.width = `${width}%`;
  
        const assetCount = assetCounts[assetIndex - 1];
        incrementMoneyOnReset(assetCount);
  
        // Clear the interval after reaching 100%
        clearInterval(interval);
      } else {
        width += 0.5;
        progressBar.style.width = `${width}%`;
      }
    }, 20);
  };
  

  return (
    <div>
      <h1>Incremental Game</h1>
    
      <div>
        <button id="increment-button" onClick={incrementMoney}>
          Increment Money
        </button>
        <span id="balance">${money.toFixed(2)}</span>
      </div>
      <div id="assets">
        <div className="asset-item">
          <img src="asset1.jpg" alt="Asset 1" />
          <span className={styles.assetReturn} id="asset1-return">
            +2
          </span>
          <button
            onClick={() => purchaseAsset(1)}
            id="asset1-button"
            className={styles.assetButton}
          >
            Buy Asset 1 ($<span id="asset1-cost">{assetPrices[0]}</span>)
          </button>
          <span className={styles.assetCount} id="asset1-count">
            {assetCounts[0]}
          </span>
          <span className={styles.assetProfit} id="asset1-profit">
            Profit:{" "}
          </span>
          <div className="asset-progress-bar">
            <div
              className="progress"
              id="asset1-progress"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncrementalGame;
