import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import MovieSearchView from '../../views/MovieSearchView';
import 'jest-enzyme';
import { waitForAct } from '@noshot/utils';
import mockMatchMedia from '../setupTests';
import { mockData } from '../mockData/mockData';

configure({ adapter: new Adapter() });
describe('Search movie page display test', () => {
	beforeAll(() => {
		mockMatchMedia();
		global.fetch = jest.fn();
	});

	let wrapper;
	beforeEach(() => {
		wrapper = mount(<MovieSearchView />);
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it('movie list should display no data', () => {
		const table = wrapper.find('.ant-empty-description');

		expect(table.text()).toEqual('No data');
	});

	it('movie list should display 3 movies', async() => {
		fetch.mockImplementation(() => {
			return Promise.resolve({
				status: 200,
				json: () => {
					return Promise.resolve(mockData);
				}
			});
		});
		const search = wrapper.find('button');

		search.simulate('click');

		await waitForAct(() => {
			wrapper.update();

			expect(global.fetch).toHaveBeenCalled();
			expect(wrapper.state('movies')).toHaveLength(3);
		});

		global.fetch.mockClear();
	});
});
