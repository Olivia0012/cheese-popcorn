import React from 'react';
import { render } from '@testing-library/react';
import MovieDetails from '../../components/MovieDetails';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { movie } from '../mockData/mockData';
import mockMatchMedia from '../setupTests';

configure({ adapter: new Adapter() });
describe('Movie details display test', () => {
	beforeAll(() => {
		mockMatchMedia();
	});

	it('should display the movie details.', () => {
		const { getByText } = render(<MovieDetails movie={movie} open={true} />);

		expect(getByText('Movie Details')).toBeTruthy;
		expect(getByText('Test Movie Detail Pannel')).toBeTruthy;
	});

	it('should display the movie not found! when not provide movie', () => {
		const { getByText } = render(<MovieDetails open={true} />);

		expect(getByText('Not found!')).toBeTruthy;
	});

	it('should close the movie details drawer.', () => {
		const onClickMock = jest.fn();
		const wrapper = mount(<MovieDetails movie={movie} open={true} />);
		wrapper.setProps({setOpen : () => {}});
		const button = wrapper.find('button');

		button.simulate('click');
		expect(onClickMock).toBeCalled;
		expect(wrapper.find('.ant-drawer-content-wrapper')).toBeFalsy;
	});
});
