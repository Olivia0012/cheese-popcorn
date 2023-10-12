import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../../../components/navbar/Navbar";
import Input from "../../../components/input/Input";

test('Input field change event should trigger the setQuery', () => {
    let query = '';
    const handleChange = jest.fn(() => query = 'Spider Man 1');
    render(<Navbar children={<Input query={query} setQuery={handleChange} />} />)
    const input = screen.getByLabelText('generic-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Spider Man 2' } })

    expect(input.value).toBe('Spider Man 2')
    expect(query).toBe('Spider Man 1')
});