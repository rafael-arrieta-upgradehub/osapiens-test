import React from 'react';
import renderer from 'react-test-renderer';
import TemperatureDisplay from '@/components/TemperatureDisplay';

describe('TemperatureDisplay', () => {
    it('renders correctly with temperature and weather description', () => {
        const tree = renderer.create(
            <TemperatureDisplay temperature={25} weatherDescription="Warm" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('renders correctly with temperature and weather description', () => {
        const tree = renderer.create(
            <TemperatureDisplay temperature={25} weatherDescription="Cold" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
