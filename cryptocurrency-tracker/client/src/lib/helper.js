import React from 'react';

const moneyFormat = (value) => {
  // Nine or more zeroes for billions

  return Math.abs(Number(value)) >= 1.0e+9
    ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + 'B'
    : Math.abs(Number(value)) >= 1.0e+6
    ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + 'M'
    : Math.abs(Number(value)) >= 1.0e+3
    ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + 'K'
    : Number(value).toFixed(2);
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const colorChange = (value) => {
  if (value >= 0) {
    return <span id='positive'>{value}%</span>
  } else {
    return <span id='negative'>{value}%</span>
  }
}

export { moneyFormat, capitalize, colorChange };