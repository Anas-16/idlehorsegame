import React from 'react';

function UpgradeItem({ name, cost, icon, count, onClick, description, effect }) {
  return (
    <div className="upgrade-item" onClick={onClick}>
      <span className="upgrade-icon">{icon}</span>
      <span className="upgrade-name">{name}</span>
      <span className="upgrade-cost">{cost} coins</span>
      <span className="upgrade-count">{count}</span>
      <div className="upgrade-tooltip">
        <p>{description}</p>
        <p>Effect: {effect}</p>
      </div>
    </div>
  );
}

export default UpgradeItem;