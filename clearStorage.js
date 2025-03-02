// clearStorage.js
const fs = require('fs');
const path = require('path');
const os = require('os');

// Function to get the app's user data directory based on OS
function getUserDataPath(appName) {
  const homePath = os.homedir();
  
  switch (process.platform) {
    case 'win32':
      return path.join(homePath, 'AppData', 'Roaming', appName);
    case 'darwin': // macOS
      return path.join(homePath, 'Library', 'Application Support', appName);
    case 'linux':
      return path.join(homePath, '.config', appName);
    default:
      throw new Error('Unsupported platform');
  }
}

try {
  // Read package.json to get the app name
  const packageJson = require('./package.json');
  const appName = packageJson.name;
  
  const userDataPath = getUserDataPath(appName);
  const localStoragePath = path.join(userDataPath, 'Local Storage');
  
  console.log(`Looking for storage in: ${localStoragePath}`);
  
  if (fs.existsSync(localStoragePath)) {
    const files = fs.readdirSync(localStoragePath);
    
    if (files.length > 0) {
      files.forEach(file => {
        if (file.includes('leveldb')) {
          const filePath = path.join(localStoragePath, file);
          fs.unlinkSync(filePath);
          console.log(`Removed: ${file}`);
        }
      });
      console.log('Local Storage cleared successfully');
    } else {
      console.log('No storage files found');
    }
  } else {
    console.log('No Local Storage directory exists yet');
  }
} catch (error) {
  console.error('Error:', error);
}