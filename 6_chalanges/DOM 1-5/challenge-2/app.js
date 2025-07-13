/**
 * Write your challenge solution here
 */

const colorChangingHeader = document.getElementById('mainHeading');
const colorRed = document.getElementById('redButton');
const colorGreen = document.getElementById('greenButton');
const colorBlue = document.getElementById('blueButton');
const colorPurple = document.getElementById('purpleButton');
const toResetColor = document.getElementById('resetButton');

colorRed.addEventListener('click', () => {
    colorChangingHeader.style.color = '#e74c3c';
});
colorGreen.addEventListener('click', () => {
    colorChangingHeader.style.color = '#2ecc71';
});
colorBlue.addEventListener('click', () => {
    colorChangingHeader.style.color = '#3498db';
});
colorPurple.addEventListener('click', () => {
    colorChangingHeader.style.color = '#9b59b6';
});

toResetColor.addEventListener('click', () => {
    colorChangingHeader.style.color = '#34495e';
});