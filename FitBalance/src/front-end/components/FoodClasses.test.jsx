import { FoodItem, Protein, Carbs, Fats, FoodFactory } from './food-classes.jsx';

describe('FoodItem Base Class', () => {
  test('should initialize with correct properties', () => {
    const item = new FoodItem('Apple', 52, 150, 'id1');
    expect(item.name).toBe('Apple');
    expect(item.caloriesPer100g).toBe(52);
    expect(item.weight).toBe(150);
    expect(item.id).toBe('id1');
    expect(item.isEditing).toBe(false);
  });

  test('should auto-generate ID when not provided', () => {
    const item = new FoodItem('Banana', 89, 120);
    expect(item.id).toMatch(/^[a-z0-9]{9}$/);
  });

  test('should calculate calories correctly', () => {
    const item = new FoodItem('Apple', 100, 200);
    expect(item.getNutrition().calories).toBe(200);
  });

  test('should handle zero weight', () => {
    const item = new FoodItem('Apple', 100);
    expect(item.getNutrition().calories).toBe(0);
  });
});

describe('Protein Subclass', () => {
  test('should have protein category', () => {
    const chicken = new Protein('Chicken', 165, 31);
    expect(chicken.category).toBe('protein');
  });

  test('should calculate nutrition correctly', () => {
    const chicken = new Protein('Chicken', 165, 31, 100);
    const nutrition = chicken.getNutrition();
    expect(nutrition.calories).toBe(165);
    expect(nutrition.protein).toBe(31);
  });

  test('should handle decimal values', () => {
    const beef = new Protein('Beef', 250, 26, 75);
    expect(beef.getNutrition().protein).toBe(19.5);
  });
});

