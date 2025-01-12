document.addEventListener('DOMContentLoaded', () => {
  const batteryHealthElement = document.querySelector('.battery-info__health');
  const batteryTemperatureElement = document.querySelector('.battery-info__temperature');
  const powerSourceElement = document.querySelector('.battery-info__source');

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
  }

  function updateBatteryInfo(battery) {
    const batteryHealth = battery.level > 0.8 ? 'Good' : battery.level > 0.5 ? 'Fair' : 'Poor';
    const batteryTemperature = '30°C'; // Placeholder, as Battery Status API does not provide temperature
    const powerSource = battery.charging ? 'AC Power' : 'Battery';

    batteryHealthElement.textContent = batteryHealth;
    batteryTemperatureElement.textContent = batteryTemperature;
    powerSourceElement.textContent = powerSource;
  }
});
