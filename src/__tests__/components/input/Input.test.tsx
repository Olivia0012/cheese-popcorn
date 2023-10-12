import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../../../components/input/Input';

describe('Input test suite', () => {
    const setup = (query: string) => {
        const handleChange = jest.fn();
        const utils = render(<Input query={query} setQuery={handleChange} />)
        const input = screen.getByLabelText('generic-input') as HTMLInputElement;

        return {
            input,
            ...utils,
        }
    }

    test('Input value should change fron test to chuck', () => {
        const { input } = setup('Titanic');
        expect(input.value).toBe('Titanic');
    });

    test('Input value should be changed when fire the change event', () => {
        let query = '';
        const handleChange = jest.fn(() => query = 'Spider Man 1');
        render(<Input query={'abc'} setQuery={handleChange} />)
        const input = screen.getByLabelText('generic-input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Spider Man 2' } })

        expect(input.value).toBe('Spider Man 2')
        expect(query).toBe('Spider Man 1')
    });
})