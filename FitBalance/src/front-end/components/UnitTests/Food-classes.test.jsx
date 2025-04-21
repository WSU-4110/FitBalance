import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FoodList from "../FoodList";
import { act } from 'react';

const mockFood = (name, weight, nutrition) => ({
  name,
  weight,
  getNutrition: () => nutrition,
});

const defaultProps = {
  category: "protein",
  foods: [],
  userLoggedIn: true,
  editingFood: {},
  onWeightChange: jest.fn(),
  onStartEditing: jest.fn(),
  onSaveEdit: jest.fn(),
  onCancelEdit: jest.fn(),
  onDelete: jest.fn(),
  onQuickAdd: jest.fn(),
  onNewFoodChange: jest.fn(),
};

describe("FoodList component", () => {
  it("renders empty state with quick add button when user is logged in", () => {
    render(<FoodList {...defaultProps} />);
    expect(screen.getByText("+ Add your meal")).toBeInTheDocument();
  });

  it("renders empty state message when user is not logged in", () => {
    render(<FoodList {...defaultProps} userLoggedIn={false} />);
    expect(screen.getByText("No items added")).toBeInTheDocument();
  });

  it("calls onQuickAdd when quick add button is clicked", () => {
    render(<FoodList {...defaultProps} />);
    fireEvent.click(screen.getByText("+ Add your meal"));
    expect(defaultProps.onQuickAdd).toHaveBeenCalled();
  });

  it("renders a food item with correct macro and allows editing", () => {
    const food = mockFood("Chicken", 150, { protein: 30, calories: 200 });
    render(<FoodList {...defaultProps} foods={[food]} editingFood={{}} />);

    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.getByText("200 Cal")).toBeInTheDocument();
    expect(screen.getByText("/ 30g Protein")).toBeInTheDocument();
  });

  it("calls onStartEditing when food name is clicked", () => {
    const food = mockFood("Chicken", 150, { protein: 30, calories: 200 });
    render(<FoodList {...defaultProps} foods={[food]} />);

    fireEvent.click(screen.getByText("Chicken"));
    expect(defaultProps.onStartEditing).toHaveBeenCalledWith("protein", 0);
  });

  it("disables weight input if user is not logged in", () => {
    const food = mockFood("Rice", 100, { carbs: 20, calories: 100 });
    render(<FoodList {...defaultProps} userLoggedIn={false} category="carbs" foods={[food]} />);
    const input = screen.getAllByPlaceholderText("100")[0];
    expect(input).toBeDisabled();
  });

  
  it("renders editing input and handles changes", () => {
    const food = mockFood("Chicken", 150, { protein: 30, calories: 200 });
    const editingFood = { category: "protein", index: 0, name: "Chicken" };
    render(<FoodList {...defaultProps} foods={[food]} editingFood={editingFood} />);

    const input = screen.getByDisplayValue("Chicken");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Grilled Chicken" } });
    expect(defaultProps.onNewFoodChange).toHaveBeenCalledWith({ ...editingFood, name: "Grilled Chicken" });
  });

  it("calls onSaveEdit and onCancelEdit when buttons are clicked", () => {
    const food = mockFood("Chicken", 150, { protein: 30, calories: 200 });
    const editingFood = { category: "protein", index: 0, name: "Chicken" };
    render(<FoodList {...defaultProps} foods={[food]} editingFood={editingFood} />);

    fireEvent.click(screen.getByText("Save"));
    expect(defaultProps.onSaveEdit).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onCancelEdit).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    const food = mockFood("Chicken", 150, { protein: 30, calories: 200 });
    render(<FoodList {...defaultProps} foods={[food]} />);
    fireEvent.click(screen.getByTitle("Delete item"));
    expect(defaultProps.onDelete).toHaveBeenCalledWith("protein", 0);
  });
});
