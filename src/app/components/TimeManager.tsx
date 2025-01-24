import React, { useState } from 'react';
import styles from './Time.module.css';

const TimeManager: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('');

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };

  const highlightCell = (inputElement: HTMLInputElement) => {
    if (selectedColor) {
      inputElement.style.backgroundColor = selectedColor;
    }
  };

  const addCustomColor = () => {
    const customColorElement = document.getElementById('custom-color') as HTMLInputElement;
    const customNameElement = document.getElementById('custom-name') as HTMLInputElement;

    if (customColorElement && customNameElement) {
      const customColor = customColorElement.value;
      const customName = customNameElement.value || 'Custom';

      console.log('Adding custom color:', customColor, customName); // Debugging line

      const colorPicker = document.querySelector(`.${styles.colorPicker}`);
      const newColorDiv = document.createElement('div');
      newColorDiv.classList.add(styles.color);

      const colorCircle = document.createElement('div');
      colorCircle.style.backgroundColor = customColor;
      colorCircle.onclick = () => selectColor(customColor);

      const colorLabel = document.createElement('span');
      colorLabel.textContent = customName;

      newColorDiv.appendChild(colorCircle);
      newColorDiv.appendChild(colorLabel);

      colorPicker?.appendChild(newColorDiv);
    }
  };

  return (
    <div>
      <h1>Time Management Schedule</h1>
      <div className={styles.colorPicker}>
        <div className={styles.color}>
          <div style={{ backgroundColor: 'red' }} onClick={() => selectColor('red')}></div>
          <span>Exercise</span>
        </div>
        <div className={styles.color}>
          <div style={{ backgroundColor: 'blue' }} onClick={() => selectColor('blue')}></div>
          <span>Studying</span>
        </div>
        <div className={styles.color}>
          <div style={{ backgroundColor: 'green' }} onClick={() => selectColor('green')}></div>
          <span>Work</span>
        </div>
        <div className={styles.color}>
          <div style={{ backgroundColor: 'yellow' }} onClick={() => selectColor('yellow')}></div>
          <span>Other</span>
        </div>
        <div className={styles.color}>
          <div style={{ backgroundColor: 'purple' }} onClick={() => selectColor('purple')}></div>
          <span>Sleep</span>
        </div>
        <div className={styles.color}>
          <div style={{ backgroundColor: 'white' }} onClick={() => selectColor('white')}></div>
          <span>None</span>
        </div>
      </div>

      <div className={styles.addColor}>
        <input type="color" id="custom-color" />
        <input type="text" id="custom-name" placeholder="Enter color name" />
        <button onClick={addCustomColor}>Add Custom Color</button>
      </div>

      <table className={styles.table}>
  <thead>
    <tr>
      <th>Hour</th>
      <th>00-15</th>
      <th>15-30</th>
      <th>30-45</th>
      <th>45-60</th>
    </tr>
  </thead>
  <tbody>
    {['12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'].map((time) => (
      <tr key={time}>
        <td>{time}</td>
        <td><input type="text" onClick={(e) => highlightCell(e.target as HTMLInputElement)} /></td>
        <td><input type="text" onClick={(e) => highlightCell(e.target as HTMLInputElement)} /></td>
        <td><input type="text" onClick={(e) => highlightCell(e.target as HTMLInputElement)} /></td>
        <td><input type="text" onClick={(e) => highlightCell(e.target as HTMLInputElement)} /></td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default TimeManager;
