import React, { useState, useEffect } from 'react';
import './EquestrianEmpire.css';
import HorseManagement from './components/HorseManagement';
import UpgradeItem from './components/UpgradeItem';

function App() {
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [coinsPerClick, setCoinsPerClick] = useState(1);
  const [xpPerClick, setXpPerClick] = useState(1);
  const [multiplier, setMultiplier] = useState(1.5);
  const [upgrades, setUpgrades] = useState({
    groomingKit: 0,
    betterFeed: 0
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => prevCoins + upgrades.groomingKit * multiplier);
      setXp(prevXp => prevXp + upgrades.betterFeed * multiplier);
    }, 1000);
    return () => clearInterval(interval);
  }, [upgrades, multiplier]);

  const handleClick = () => {
    setCoins(coins + coinsPerClick * multiplier);
    setXp(xp + xpPerClick * multiplier);
  };

  const handleUpgrade = (upgradeName, cost) => {
    if (coins >= cost) {
      setCoins(coins - cost);
      setUpgrades({...upgrades, [upgradeName]: upgrades[upgradeName] + 1});
      
      if (upgradeName === 'groomingKit') {
        setCoinsPerClick(prevCoinsPerClick => prevCoinsPerClick + 1);
      } else if (upgradeName === 'betterFeed') {
        setXpPerClick(prevXpPerClick => prevXpPerClick + 1);
      }
      
      setMultiplier(prevMultiplier => prevMultiplier + 0.1);
    }
  };

  return (
    <div className="equestrian-empire">
      <div className="left-panel">
        <HorseManagement coins={coins} xp={xp} />
        <div className="upgrades-list">
          <UpgradeItem 
            name="Grooming Kit" 
            cost={20} 
            icon="🧼" 
            count={upgrades.groomingKit} 
            onClick={() => handleUpgrade('groomingKit', 20)}
            description="Efficient pruner"
            effect="Produces 1 coin every second"
            passiveEffect={`Increases production by ${((multiplier - 1) * 100).toFixed(1)}%`}
          />
          <UpgradeItem 
            name="Better Feed" 
            cost={150} 
            icon="🌾" 
            count={upgrades.betterFeed} 
            onClick={() => handleUpgrade('betterFeed', 150)}
            description="High-quality horse feed"
            effect="Produces 1 XP every second"
            passiveEffect={`Increases production by ${((multiplier - 1) * 100).toFixed(1)}%`}
          />
        </div>
      </div>
      
      <div className="center-panel">
        <h2>Equestrian Empire</h2>
        <div className="ranch-image" onClick={handleClick} role="button" tabIndex={0}></div>
      </div>
      
      <div className="right-panel">
        <h3>Resources</h3>
        <p>Coins: {Math.floor(coins)}</p>
        <p>XP: {Math.floor(xp)}</p>
        <h3>Upgrades</h3>
        <p>Grooming Kits: {upgrades.groomingKit}</p>
        <p>Better Feed: {upgrades.betterFeed}</p>
        <p>Production Multiplier: {multiplier.toFixed(1)}x</p>
      </div>
    </div>
  );
}

export default App;