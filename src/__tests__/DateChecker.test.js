import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateTimeChecker from '../components/DateTimeChecker';

describe('DateTimeChecker Component Tests', () => {
  // Test GUI Elements
  test('renders all required GUI elements', () => {
    render(<DateTimeChecker />);
    
    // Check input fields
    expect(screen.getByLabelText(/day/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    
    // Check submit button
    expect(screen.getByRole('button', { name: /check/i })).toBeInTheDocument();
    
    // Check result display area (using testId as there's no specific text/role)
    expect(screen.getByTestId('result-area')).toBeInTheDocument();
    
    // Check clear button
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  // Test Input Validation (checking date existence and format combined)
  test('validates date input and displays results', async () => {
    render(<DateTimeChecker />);
    const dayInput = screen.getByLabelText(/day/i);
    const monthInput = screen.getByLabelText(/month/i);
    const yearInput = screen.getByLabelText(/year/i);
    const checkButton = screen.getByRole('button', { name: /check/i });
    const resultArea = screen.getByTestId('result-area');

    // Test valid date
    await userEvent.type(dayInput, '15');
    await userEvent.type(monthInput, '03');
    await userEvent.type(yearInput, '2024');
    fireEvent.click(checkButton);
    // Use findByText to wait for the text to appear
    await screen.findByText(/valid date!/i);

    // Test non-existent date
    await userEvent.clear(dayInput);
    await userEvent.clear(monthInput);
    await userEvent.clear(yearInput);
    await userEvent.type(dayInput, '31');
    await userEvent.type(monthInput, '02');
    await userEvent.type(yearInput, '2024'); // Not a leap year
    fireEvent.click(checkButton);
    // Use findByText to wait for the text to appear
    await screen.findByText(/invalid date!/i);

    // Test leap year date
    await userEvent.clear(dayInput);
    await userEvent.clear(monthInput);
    await userEvent.clear(yearInput);
    await userEvent.type(dayInput, '29');
    await userEvent.type(monthInput, '02');
    await userEvent.type(yearInput, '2024'); // Leap year
    fireEvent.click(checkButton);
    // Use findByText to wait for the text to appear
    await screen.findByText(/valid date!/i);
    
    // Test invalid format (non-numeric input - although input type=number helps prevent this, good to have)
    // Note: type=number restricts non-numeric input, this test might need adjustment or focus on boundary cases
    // For basic demonstration, we'll focus on valid/invalid date values.
  });

  test('clears input fields when Clear button is clicked', async () => {
    render(<DateTimeChecker />);
    const dayInput = screen.getByLabelText(/day/i);
    const monthInput = screen.getByLabelText(/month/i);
    const yearInput = screen.getByLabelText(/year/i);
    const clearButton = screen.getByRole('button', { name: /clear/i });
    const resultArea = screen.getByTestId('result-area');

    // Type some values
    await userEvent.type(dayInput, '15');
    await userEvent.type(monthInput, '03');
    await userEvent.type(yearInput, '2024');
    expect(dayInput).toHaveValue(15);
    expect(monthInput).toHaveValue(3);
    expect(yearInput).toHaveValue(2024);

    // Click clear button
    fireEvent.click(clearButton);

    // Check if inputs are cleared
    expect(dayInput).toHaveValue(null);
    expect(monthInput).toHaveValue(null);
    expect(yearInput).toHaveValue(null);
    // Also check if result area is cleared
    expect(resultArea).toBeEmptyDOMElement();
  });
}); 