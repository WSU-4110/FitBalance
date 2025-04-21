import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import AddFoodForm from '../AddFoodForm';

describe('AddFoodForm Component', () => {
  const baseProps = {
    newFood: {
      type: 'protein',
      name: '',
      caloriesPer100g: '',
      macroPer100g: '',
      weight: '',
    },
    onNewFoodChange: jest.fn(),
    onAddFood: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all input fields and button', () => {
      render(<AddFoodForm {...baseProps} />);

      expect(screen.getByPlaceholderText('Food Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Calories per 100g')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Protein per 100g')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Weight (g)')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add food/i })).toBeInTheDocument();
    });
  });
});