# Battery Health Checker

# Overview

Battery Health Checker is a web application that provides detailed information about your device's battery health, temperature, power source, and offers recommendations for maintaining optimal battery performance.

## Features

- Real-time battery level monitoring
- Battery health status
- Battery temperature display
- Power source detection
- Battery usage history tracking
- Battery maintenance recommendations

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/festus-sulumeti/Battery_health_checker.git
    ```
2. Navigate to the project directory:
    ```sh
    cd battery-level-indicator
    ```
3. Install the dependencies (requires `Node.js >= v22.13.0` (for the lower versions `< v22.13.0` it may or may not work)):
    ```sh
    npm install
    ```

## Running the Application

To run the application, open the `index.html` file in your preferred web browser.

## Running Tests

This project uses Jasmine for testing. The tests are located in the `test` directory.

### Running Tests in the Browser

1. Open the `test/SpecRunner.html` file in your preferred web browser to run the tests.

### Running Tests using npm

1. Run the following command to open the `SpecRunner.html` file in your default browser:
    ```sh
    npm run test
    ```

## Tests

The tests cover the following functionality:

- **Battery Health**: Ensures that the battery health is updated correctly based on the battery level.
- **Battery Temperature**: Ensures that the battery temperature is simulated and updated correctly.
- **Power Source**: Ensures that the power source is updated correctly based on the charging status.
- **Recommendations**: Ensures that recommendations are generated correctly based on the battery health, temperature, and power source.

### Example Test

Here is an example test that checks if the battery health is updated correctly:

```javascript
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
});
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Icons by [Remixicon](https://remixicon.com/).
- Inspired by various battery health monitoring tools.

## Contact
For any inquiries, please contact [mail@me.com](mailto:mails@me.com).
