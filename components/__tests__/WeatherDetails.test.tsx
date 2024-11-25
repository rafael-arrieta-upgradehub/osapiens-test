import React from 'react';
import renderer from 'react-test-renderer';
import WeatherDetails from '@/components/WeatherDetails';
describe('TemperatureDisplay', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<WeatherDetails temperature={25.1234} wind={10.5678} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
