import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { waitForAct } from '@noshot/utils';
import MovieList from '../../components/MovieList';
import { mockData, movie, mockErrorData } from '../mockData/mockData';
import mockMatchMedia from '../setupTests';

configure({ adapter: new Adapter() });

describe('Movie MovieList display test', () => {
  beforeAll(() => {
		mockMatchMedia();
  });
  
	let originalFetch, wrapper;

	beforeEach(() => {
		originalFetch = global.fetch;
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(movie)
			})
		);
	});

	afterEach(() => {
		global.fetch = originalFetch;
		wrapper.unmount();
	});

	it('should display the 3 movies in the table.', () => {
		wrapper = mount(<MovieList movies={mockData.Search} />);
		const table = wrapper.find('table');
		const row = table.find('tr');

		expect(table).toHaveLength(1);
		expect(row).toHaveLength(4);
	});

	it('should show no data for the first load.', async() => {
		wrapper = mount(<MovieList movies={[ mockData.Search[0] ]} />);
		wrapper.find('tr a').simulate('click');

		await waitForAct(() => {
			wrapper.update();

			expect(wrapper.find('.ant-drawer-content-wrapper')).toBeTruthy;
			expect(originalFetch).toHaveBeenCalled;
		});
	});

	it('should show error message', () => {
		wrapper = mount(<MovieList error={mockErrorData.Error} loading={false}/>);

		expect(wrapper.find('tbody td').text()).toEqual('Incorrect IMDb ID.');
	});

	it('should show spinning when loading data.', async() => {
		wrapper = mount(<MovieList movies={[ mockData.Search[0] ]} />);
		wrapper.find('tr a').simulate('click');

		await waitForAct(() => {
			wrapper.update();

			expect(wrapper.find('.ant-spin-dot-spin')).toBeTruthy;
			expect(originalFetch).toHaveBeenCalled;
		});
	});
});
