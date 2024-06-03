// Convert a hex color to a 3-digit color code
function hexToThreeDigitColor(hex) {
  // Remove the leading '#'
  hex = hex.substring(1);

  // Split the hex color into its red, green, and blue components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convert each component to a single digit (0-9)
  const r3 = Math.round(r / 255 * 9);
  const g3 = Math.round(g / 255 * 9);
  const b3 = Math.round(b / 255 * 9);

  // Return the 3-digit color code
  return `${r3}${g3}${b3}`;
}

document.getElementById('colorPicker').addEventListener('input', function() {
  const hexColor = this.value;
  const threeDigitColor = hexToThreeDigitColor(hexColor);
  const usernameInput = document.getElementById('usernameInput');

  // Update the username input with the selected color tag
  usernameInput.value = `<#${threeDigitColor}>` + usernameInput.value.replace(/<#\d{3}>/, '');
});

document.getElementById('copyToClipboardButton').addEventListener('click', function() {
  const input = document.getElementById('usernameInput').value;
  const coloredUsernameElement = document.getElementById('coloredUsername');
  
  // Regular expression to match the color tag
  const colorTagRegex = /<#(\d{3})>/;
  const match = input.match(colorTagRegex);
  
  if (match) {
    const colorCode = match[1];
    const username = input.replace(colorTagRegex, '');
    
    // Convert the 3-digit color code to a 6-digit hex code
    const hexColor = `#${colorCode.split('').map(c => Math.round(parseInt(c) * 255 / 9).toString(16).padStart(2, '0')).join('')}`;
    
    // Set the colored username with the correct color
    coloredUsernameElement.textContent = username;
    coloredUsernameElement.style.color = hexColor;
    
    // Copy the formatted username to clipboard
    const formattedUsername = `<#${colorCode}>${username}`;
    navigator.clipboard.writeText(formattedUsername).then(() => {
      alert('Username copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  } else {
    coloredUsernameElement.textContent = 'Invalid color tag';
    coloredUsernameElement.style.color = 'black';
  }
});