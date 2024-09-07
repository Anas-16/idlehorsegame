import React from 'react';

function HorseManagement({ coins, xp }) {
  return (
    <div className="horse-management">
      <h2>Manage Horses</h2>
      <p>{coins} coins, {xp} XP</p>
    </div>
  );
}

export default HorseManagement;