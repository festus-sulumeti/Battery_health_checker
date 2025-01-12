
function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

function notifyBatteryEvents(battery) {
  battery.addEventListener('chargingchange', () => {
    if (battery.charging) {
      playSound('sounds/charging.mp3');
    } else {
      playSound('sounds/disconnected.mp3');
    }
  });

  battery.addEventListener('levelchange', () => {
    if (battery.level <= 0.15 && !battery.charging) {
      playSound('sounds/low-battery.mp3');
    } else if (battery.level === 1 && battery.charging) {
      playSound('sounds/full-battery.mp3');
    }
  });
}

navigator.getBattery().then(notifyBatteryEvents);