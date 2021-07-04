import React from 'react';
import { shallow } from 'enzyme';
import Pie from '.';


const setUp = () => {
    const component = shallow(<Pie fill={50} icon={'test'} color={'red'}  />);
    return component;
};


describe('Pie component', () => {
    let component;

    beforeEach(() => {
        component = setUp();
    });

    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    })

})