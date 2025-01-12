describe('Battery Info', () => {
  let batteryMock;

  beforeEach(() => {
    batteryMock = {
      level: 0.5,
      charging: false,
      addEventListener: jasmine.createSpy('addEventListener')
    };

    spyOn(navigator, 'getBattery').and.returnValue(Promise.resolve(batteryMock));

    document.body.innerHTML = `
      <div class="battery-info__health"></div>
      <div class="battery-info__temperature"></div>
      <div class="battery-info__source"></div>
      <ul class="battery-recommendations__list"></ul>
    `;

    require('../js/battery-info.js');
  });

  it('should update battery health', (done) => {
    navigator.getBattery().then(() => {
      const batteryHealthElement = document.querySelector('.battery-info__health');
      expect(batteryHealthElement.textContent).toBe('Fair');
      done();
    });
  });

  it('should update battery temperature', (done) => {
    navigator.getBattery().then(() => {
      const batteryTemperatureElement = document.querySelector('.battery-info__temperature');
      expect(batteryTemperatureElement.textContent).toBe('35°C'); // Simulated temperature for 50% level
      done();
    });
  });

  it('should update power source', (done) => {
    navigator.getBattery().then(() => {
      const powerSourceElement = document.querySelector('.battery-info__source');
      expect(powerSourceElement.textContent).toBe('Battery');
      done();
    });
  });

  it('should generate recommendations', (done) => {
    navigator.getBattery().then(() => {
      const recommendationsListElement = document.querySelector('.battery-recommendations__list');
      expect(recommendationsListElement.children.length).toBe(3);
      expect(recommendationsListElement.children[0].textContent).toBe('Monitor your battery health regularly.');
      expect(recommendationsListElement.children[1].textContent).toBe('Your battery temperature is within a safe range.');
      expect(recommendationsListElement.children[2].textContent).toBe('Your battery level is sufficient.');
      done();
    });
  });
});
