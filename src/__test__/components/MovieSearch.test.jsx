import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import 'jest-enzyme';
import { waitForAct } from '@noshot/utils';
import MovieSearch from '../../components/MovieSearch';
import mockMatchMedia from '../setupTests';

configure({ adapter: new Adapter() });
describe('Movie Search test', () => {
	beforeAll(() => {
		mockMatchMedia();
	});

	let wrapper, onChangeMock;

	beforeEach(() => {
		wrapper = mount(<MovieSearch />);
		onChangeMock = jest.fn();
	});

	function getEvent(value) {
		const event = {
			preventDefault() {},
			target: value
		};
		return event;
	}

	it('title input should be updated', () => {
		const event = getEvent({ value: 'Spiderman' });
		const input = wrapper.find('input.title');

		input.simulate('change', event);
		expect(onChangeMock).toBeCalled;
		expect(input.instance().value).toEqual('Spiderman');
	});

	it('year input should be updated', () => {
		const event = getEvent({ value: '1990' });
		const input = wrapper.find('input.year');

		input.simulate('change', event);
		expect(onChangeMock).toBeCalled;
		expect(input.instance().value).toEqual('1990');
	});

	it('plot should be Full by default, and change to be Short after select action', async () => {
		expect(wrapper.find('.ant-select-selection-item').text()).toEqual('Full');

		wrapper.find('.ant-select-selector').at(0).simulate('mousedown');
		await waitForAct(() => {
			wrapper.update();
			expect(wrapper.find('.ant-select-item')).toHaveLength(2);
		});

		wrapper.find('.ant-select-item').last().simulate('click');

		await waitForAct(() => {
			wrapper.update();
			expect(wrapper.find('.ant-select-selection-item').text()).toEqual('Short');
		});
    });

    it('type should be null by default, and change to be movie after select action', async () => {
		expect(wrapper.find('.ant-select-selection-item-content')).toHaveLength(0);

		wrapper.find('.ant-select-selector').at(1).simulate('mousedown');
		await waitForAct(() => {
			wrapper.update();
			expect(wrapper.find('.ant-select-item')).toHaveLength(3);
		});

		wrapper.find('.ant-select-item').first().simulate('click');

		await waitForAct(() => {
			wrapper.update();
			expect(wrapper.find('.ant-select-selection-item').at(1).text()).toEqual('movie');
		});
    });
});
