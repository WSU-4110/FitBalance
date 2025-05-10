import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuickAddForm from '../QuickAddForm';  // Make sure the path is correct based on your project structure

describe('QuickAddForm Component', () => {
  const baseProps = {
    category: 'protein',
    newFood: {
      name: '',
      caloriesPer100g: '',
      macroPer100g: '',
      weight: '',
    },
    onNewFoodChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    render(<QuickAddForm {...baseProps} />);
  });

  it('renders input fields for name, calories, macro, and weight', () => {
    // Check if the input fields are present
    expect(screen.getByPlaceholderText('Food Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Calories per 100g')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Protein per 100g')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Weight (g)')).toBeInTheDocument();
  });

  it('renders correct label for macro based on category', () => {
    // Check the macro label for "protein"
    expect(screen.getByPlaceholderText('Protein per 100g')).toBeInTheDocument();
    
    // Change category to "carbs" and re-render
    baseProps.category = 'carbs';
    render(<QuickAddForm {...baseProps} />);

    // Check the macro label for "carbs"
    expect(screen.getByPlaceholderText('Carbs per 100g')).toBeInTheDocument();

    // Change category to "fats" and re-render
    baseProps.category = 'fats';
    render(<QuickAddForm {...baseProps} />);

    // Check the macro label for "fats"
    expect(screen.getByPlaceholderText('Fat per 100g')).toBeInTheDocument();
  });



  it('calls onSubmit when the submit button is clicked', () => {
    const submitButton = screen.getByText('Add');
    fireEvent.click(submitButton);
    expect(baseProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(baseProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
