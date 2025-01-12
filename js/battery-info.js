document.addEventListener('DOMContentLoaded', () => {
  const batteryHealthElement = document.querySelector('.battery-info__health');
  const batteryTemperatureElement = document.querySelector('.battery-info__temperature');
  const powerSourceElement = document.querySelector('.battery-info__source');
  const recommendationsListElement = document.querySelector('.battery-recommendations__list');

  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      updateBatteryInfo(battery);

      battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
      battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
      battery.addEventListener('chargingtimechange', () => updateBatteryInfo(battery));
      battery.addEventListener('dischargingtimechange', () => updateBatteryInfo(battery));
    });
  } else {
    batteryHealthElement.textContent = 'Battery API not supported';
    batteryTemperatureElement.textContent = 'N/A';
    powerSourceElement.textContent = 'N/A';
    recommendationsListElement.innerHTML = '<li>Battery API not supported. Unable to provide recommendations.</li>';
  }

  function updateBatteryInfo(battery) {
    const batteryHealth = battery.level > 0.8 ? 'Good' : battery.level > 0.5 ? 'Fair' : 'Poor';
    const batteryTemperature = simulateBatteryTemperature(battery.level); // Simulated temperature
    const powerSource = battery.charging ? 'AC Power' : 'Battery';

    batteryHealthElement.textContent = batteryHealth;
    batteryTemperatureElement.textContent = `${batteryTemperature}°C`;
    powerSourceElement.textContent = powerSource;

    generateRecommendations(batteryHealth, batteryTemperature, powerSource, battery.level);
  }

  function simulateBatteryTemperature(batteryLevel) {
    // Simulate battery temperature based on battery level
    const minTemp = 25;
    const maxTemp = 45;

    // Calculate temperature as a percentage of the battery level
    const temperature = minTemp + (1 - batteryLevel) * (maxTemp - minTemp);

    return Math.round(temperature);
  }

  function generateRecommendations(batteryHealth, batteryTemperature, powerSource, batteryLevel) {
    const recommendations = [];

    if (batteryHealth === 'Poor') {
      recommendations.push('Consider replacing your battery soon.');
    } else if (batteryHealth === 'Fair') {
      recommendations.push('Monitor your battery health regularly.');
    }

    if (batteryTemperature > 40) {
      recommendations.push('Avoid exposing your device to high temperatures.');
    } else if (batteryTemperature < 30) {
      recommendations.push('Your battery temperature is within a safe range.');
    }

    if (powerSource === 'AC Power') {
      recommendations.push('Unplug your device once it is fully charged.');
    } else {
      if (batteryLevel < 0.15) {
        recommendations.push('Consider charging your device soon.');
      } else {
        recommendations.push('Your battery level is sufficient.');
      }
    }

    recommendationsListElement.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
  }
});
