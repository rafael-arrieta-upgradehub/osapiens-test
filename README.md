# WeatherApp

## Overview
WeatherApp is a React Native application that allows users to input a location and view the weather. The app supports toggling between two weather services and is built with TypeScript. It includes unit tests and prioritizes modularity to ensure ease of maintenance and adaptability.

## Features
- Input a location to see the weather.
- Toggle between two weather services.
- Automatic UI refresh when toggling services with an entered location.
- TypeScript for type safety and better code quality.
- Unit testing for reliability.
- Modular design for easy maintenance and adaptability.
- Input validation to ensure valid location entries.

## Implementation Details

### Weather Services
The application supports two weather services: `ApiWeather1` and `ApiWeather2`. These services are implemented in a modular way, allowing easy replacement or addition of new services.

- **Service Replacement**: Each weather service implements a common interface (`ApiWeatherInterface`). This ensures that replacing a service with another one is straightforward. The services are dynamically imported to optimize performance and resource usage.
- **UI Adaptation**: The UI adapts based on the selected weather service. This includes potential changes in colors or images to match the service's theme.

### State Management
The application uses Redux for state management. The `weatherProvider` slice handles the state related to weather data, including the selected API, forecast data, and input location.

- **Switching APIs**: The `switchApi` action allows toggling between the two weather services. When the API is switched, the UI automatically refreshes to display the weather data from the newly selected service.
- **Fetching Forecast**: The `fetchForecast` async thunk fetches weather data from the selected service based on the input location.

### Input Validation
Input validation is implemented to ensure that users enter valid latitude and longitude values. The validation checks if the values are within the acceptable range for latitude (-90 to 90) and longitude (-180 to 180).

### Unit Testing
Unit tests are written using Jest and `@testing-library/react-native`. The tests cover various aspects of the application, including state management, input validation, and component rendering.

### TypeScript
TypeScript is used throughout the application to ensure type safety and improve code quality. It helps catch errors early in the development process and provides better tooling support.

## Directory Structure
- `app/`: Contains the main application files.
- `components/`: Contains reusable UI components.
- `services/`: Contains the weather service implementations.
- `store/`: Contains Redux slices and store configuration.
- `hooks/`: Contains custom hooks.
- `constants/`: Contains application constants.
- `scripts/`: Contains utility scripts.

## How to Run
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the application: `npm run start`.

## How to Test
Run the unit tests using the following command:
```sh
npm run test
````

### Conclusion
The WeatherApp is designed with modularity, type safety, and reliability in mind. The use of TypeScript, unit testing, and a well-structured codebase ensures that the application is maintainable and adaptable to future changes.