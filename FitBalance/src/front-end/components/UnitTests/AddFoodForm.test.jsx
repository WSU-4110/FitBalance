import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddFoodForm from '../AddFoodForm';

const baseProps = {
  newFood: { name: '', type: 'carbs', macros: { carbs: 0, protein: 0, fat: 0 } },
  onNewFoodChange: jest.fn(),
  onAddFood: jest.fn(),
};

describe('Input Changes', () => {
  it('calls onNewFoodChange when food name changes', () => {
    render(<AddFoodForm {...baseProps} />);
    fireEvent.change(screen.getByPlaceholderText('Food Name'), {
      target: { value: 'Avocado' },
    });

    expect(baseProps.onNewFoodChange).toHaveBeenCalledWith({
      ...baseProps.newFood,
      name: 'Avocado',
    });
  });

  it('updates macro placeholder based on type', () => {
    const updatedProps = {
      ...baseProps,
      newFood: { ...baseProps.newFood, type: 'fats' },
    };
    render(<AddFoodForm {...updatedProps} />);
    expect(screen.getByPlaceholderText('Fat per 100g')).toBeInTheDocument();
  });
});

describe('Button Behavior', () => {
  it('calls onAddFood when Add Food button is clicked', () => {
    render(<AddFoodForm {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: /add food/i }));

    expect(baseProps.onAddFood).toHaveBeenCalled();
  });
});
