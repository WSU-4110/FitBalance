// Abstract Base Class: FoodItem
export class FoodItem {
    constructor(name, caloriesPer100g, weight = 0, id = null) {
      this.name = name
      this.caloriesPer100g = caloriesPer100g
      this.weight = weight
      this.id = id // Store Firestore document ID
      this.isEditing = false // Track editing state
    }
  
    // Method to calculate nutrition (calories)
    getNutrition() {
      const calories = ((this.weight / 100) * this.caloriesPer100g).toFixed(1)
      return { calories: Number.parseFloat(calories) || 0 }
    }
  }
  
  // Concrete Class: Protein
  export class Protein extends FoodItem {
    constructor(name, caloriesPer100g, proteinPer100g, weight = 0, id = null) {
      super(name, caloriesPer100g, weight, id) // Call parent constructor
      this.proteinPer100g = proteinPer100g
    }
  
    // Override getNutrition to include protein
    getNutrition() {
      const { calories } = super.getNutrition() // Call parent method
      const protein = ((this.weight / 100) * this.proteinPer100g).toFixed(1)
      return { calories, protein: Number.parseFloat(protein) }
    }
  }
  
  // Concrete Class: Carbs
  export class Carbs extends FoodItem {
    constructor(name, caloriesPer100g, carbsPer100g, weight = 0, id = null) {
      super(name, caloriesPer100g, weight, id) // Call parent constructor
      this.carbsPer100g = carbsPer100g
    }
  
    // Override getNutrition to include carbs
    getNutrition() {
      const { calories } = super.getNutrition() // Call parent method
      const carbs = ((this.weight / 100) * this.carbsPer100g).toFixed(1)
      return { calories, carbs: Number.parseFloat(carbs) }
    }
  }
  
  // Concrete Class: Fats
  export class Fats extends FoodItem {
    constructor(name, caloriesPer100g, fatPer100g, weight = 0, id = null) {
      super(name, caloriesPer100g, weight, id) // Call parent constructor
      this.fatPer100g = fatPer100g
    }
  
    // Override getNutrition to include fat
    getNutrition() {
      const { calories } = super.getNutrition() // Call parent method
      const fat = ((this.weight / 100) * this.fatPer100g).toFixed(1)
      return { calories, fat: Number.parseFloat(fat) }
    }
  }
  
  // Factory Class: FoodFactory
  export class FoodFactory {
    static createFood(type, name, caloriesPer100g, macroPer100g, weight = 0, id = null) {
      switch (type) {
        case "protein":
          return new Protein(name, caloriesPer100g, macroPer100g, weight, id)
        case "carbs":
          return new Carbs(name, caloriesPer100g, macroPer100g, weight, id)
        case "fats":
          return new Fats(name, caloriesPer100g, macroPer100g, weight, id)
        default:
          throw new Error("Invalid food type")
      }
    }
  }
  