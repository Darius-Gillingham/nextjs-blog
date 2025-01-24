import React, { useState } from 'react';
import styles from './Calculator.module.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0'); // Using state for display

  // Functions for handling button clicks
  const appendValue = (value: string) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const deleteLast = () => {
    if (display.length === 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay((prev) => prev.slice(0, -1));
    }
  };

  const calculateResult = () => {
    try {
      // Using eval is generally unsafe, but for simplicity here:
      setDisplay(eval(display).toString());
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation and Title */}
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold">Calculator</h1>
      </div>

      {/* Calculator Container */}
      <div className="flex-grow flex items-center justify-center">
        <div className={styles.calculator}>
          <div className={styles.display}>{display}</div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={clearDisplay}>C</button>
            <button className={styles.button} onClick={() => appendValue('')} disabled></button>
            <button className={styles.button} onClick={deleteLast}>DEL</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => appendValue('/')}>/</button>
            <button className={styles.button} onClick={() => appendValue('7')}>7</button>
            <button className={styles.button} onClick={() => appendValue('8')}>8</button>
            <button className={styles.button} onClick={() => appendValue('9')}>9</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => appendValue('*')}>*</button>
            <button className={styles.button} onClick={() => appendValue('4')}>4</button>
            <button className={styles.button} onClick={() => appendValue('5')}>5</button>
            <button className={styles.button} onClick={() => appendValue('6')}>6</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => appendValue('-')}>-</button>
            <button className={styles.button} onClick={() => appendValue('1')}>1</button>
            <button className={styles.button} onClick={() => appendValue('2')}>2</button>
            <button className={styles.button} onClick={() => appendValue('3')}>3</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => appendValue('+')}>+</button>
            <button className={styles.button} onClick={() => appendValue('0')}>0</button>
            <button className={styles.button} onClick={() => appendValue('.')}>.</button>
            <button className={`${styles.button} ${styles.equal}`} onClick={calculateResult}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
