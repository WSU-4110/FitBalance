"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { useCalories } from "./CaloriesContext"
import { useAccount } from "./AccountContext"
import { FoodFactory } from "./components/food-classes"
import { addFoodToFirestore, updateFoodInFirestore, deleteFoodFromFirestore } from "./firebase_services"
import MacronutrientSummary from "./components/MacronutrientSummary"
import FoodCategoryCard from "./components/FoodCategoryCard"
import AddFoodForm from "./components/AddFoodForm"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase_services"

// Default foods for non-logged in users
const defaultFoods = {
  protein: [
    FoodFactory.createFood("protein", "Chicken Breast", 165, 31),
    FoodFactory.createFood("protein", "Chicken Thigh", 200, 25),
    FoodFactory.createFood("protein", "Fish", 150, 20),
  ],
  carbs: [
    FoodFactory.createFood("carbs", "Bread", 300, 50),
    FoodFactory.createFood("carbs", "Rice", 300, 80),
    FoodFactory.createFood("carbs", "Oats", 300, 70),
  ],
  fats: [
    FoodFactory.createFood("fats", "Avocados", 300, 15),
    FoodFactory.createFood("fats", "Nuts", 600, 50),
    FoodFactory.createFood("fats", "Nut Butters", 550, 45),
  ],
}

const Nutritions = () => {
  const { goalCalories, setGoalCalories } = useCalories()
  const { userLoggedIn, userEmail, loading: authLoading } = useAccount()

  // State to hold food data
  const [foods, setFoods] = useState({
    protein: [],
    carbs: [],
    fats: [],
  })

  // State for editing food name
  const [editingFood, setEditingFood] = useState({
    category: null,
    index: null,
    name: "",
  })

  // State to track if data is loading
  const [isLoading, setIsLoading] = useState(true)

  // State for adding new food
  const [newFood, setNewFood] = useState({
    type: "protein",
    name: "",
    caloriesPer100g: "",
    macroPer100g: "",
    weight: "",
  })

  // State to toggle the visibility of the "Add New Food" form
  const [showAddFoodForm, setShowAddFoodForm] = useState(false)

  // State to track which category's quick add form is open
  const [quickAddCategory, setQuickAddCategory] = useState(null)

  // Force re-render when food weights change
  const [, forceUpdate] = useState({})

  // Add a fadeIn animation to the component's style
  useEffect(() => {
    // Add the animation style to the document head
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `
    document.head.appendChild(style)

    // Clean up
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Fetch user's foods from Firestore on component mount or login/logout
  useEffect(() => {
    // Don't fetch data until auth state is determined
    if (authLoading) return

    const fetchUserFoods = async () => {
      setIsLoading(true)

      if (userLoggedIn && userEmail) {
        try {
          const q = query(collection(db, "foods"), where("userId", "==", userEmail))
          const querySnapshot = await getDocs(q)

          if (!querySnapshot.empty) {
            // User has saved foods
            const userFoods = {
              protein: [],
              carbs: [],
              fats: [],
            }

            querySnapshot.forEach((doc) => {
              const foodData = doc.data()
              if (foodData.type && ["protein", "carbs", "fats"].includes(foodData.type)) {
                const food = FoodFactory.createFood(
                  foodData.type,
                  foodData.name,
                  foodData.caloriesPer100g,
                  foodData.macroPer100g,
                  foodData.weight || 0,
                  doc.id,
                )
                userFoods[foodData.type].push(food)
              }
            })

            setFoods(userFoods)
            console.log("Loaded user foods:", userFoods)
          } else {
            // First time user - start with empty categories
            setFoods({
              protein: [],
              carbs: [],
              fats: [],
            })
            console.log("No user foods found, starting with empty categories")
          }
        } catch (error) {
          console.error("Error fetching user foods:", error)
          // Fallback to empty categories on error
          setFoods({
            protein: [],
            carbs: [],
            fats: [],
          })
        }
      } else {
        // Not logged in - use default foods from localStorage or initial defaults
        const storedFoods = JSON.parse(localStorage.getItem("foods"))
        if (storedFoods) {
          // Recreate the stored food items using FoodFactory
          const reconstructedFoods = {
            protein: storedFoods.protein.map((food) =>
              FoodFactory.createFood(
                "protein",
                food.name,
                food.caloriesPer100g,
                food.proteinPer100g,
                food.weight,
                food.id,
              ),
            ),
            carbs: storedFoods.carbs.map((food) =>
              FoodFactory.createFood("carbs", food.name, food.caloriesPer100g, food.carbsPer100g, food.weight, food.id),
            ),
            fats: storedFoods.fats.map((food) =>
              FoodFactory.createFood("fats", food.name, food.caloriesPer100g, food.fatPer100g, food.weight, food.id),
            ),
          }
          setFoods(reconstructedFoods)
          console.log("Loaded foods from localStorage")
        } else {
          // No stored foods, use defaults
          setFoods(defaultFoods)
          console.log("Using default foods")
        }
      }

      setIsLoading(false)
    }

    fetchUserFoods()
  }, [userLoggedIn, userEmail, authLoading])

  // Save non-logged in user's foods to localStorage
  useEffect(() => {
    if (!userLoggedIn && !isLoading) {
      localStorage.setItem("foods", JSON.stringify(foods))
    }
  }, [foods, userLoggedIn, isLoading])

  // Ensure valid number input for goal calories
  const handleOnChange = (event) => {
    const value = event.target.value.replace(/\D/g, "")
    setGoalCalories(value) // Keep as string to prevent input blocking
  }

  // Convert goalCalories to a number for calculations
  const calorieValue = Number.parseInt(goalCalories) || 0

  // Calculate macronutrients
  const protein = calorieValue ? (calorieValue * 0.4).toFixed(0) : "N/A"
  const carbs = calorieValue ? (calorieValue * 0.5).toFixed(0) : "N/A"
  const fat = calorieValue ? (calorieValue * 0.1).toFixed(0) : "N/A"

  // Method to update food weight
  const handleInputChange = (foodCategory, index, value) => {
    if (!userLoggedIn) return // Only allow editing if logged in

    const updatedFoods = { ...foods }
    const newWeight = Math.max(0, Number.parseInt(value) || 0)
    updatedFoods[foodCategory][index].weight = newWeight
    setFoods(updatedFoods)

    // Force re-render to update calculations
    forceUpdate({})

    // Update in Firestore if logged in
    if (userLoggedIn && updatedFoods[foodCategory][index].id) {
      const food = updatedFoods[foodCategory][index]
      updateFoodInFirestore(food.id, { weight: newWeight })
    }
  }

  // Method to start editing food name
  const startEditingFood = (category, index) => {
    if (!userLoggedIn) return // Only allow editing if logged in

    const foodName = foods[category][index].name
    setEditingFood({
      category,
      index,
      name: foodName,
    })
  }

  // Method to save edited food name
  const saveEditedFood = async () => {
    if (!editingFood.category || editingFood.index === null) return

    const { category, index, name } = editingFood
    if (!name.trim()) {
      alert("Food name cannot be empty")
      return
    }

    const updatedFoods = { ...foods }
    updatedFoods[category][index].name = name
    setFoods(updatedFoods)

    // Force re-render to update calculations
    forceUpdate({})

    // Update in Firestore if logged in
    if (userLoggedIn) {
      const food = updatedFoods[category][index]
      if (food.id) {
        // Update existing food
        await updateFoodInFirestore(food.id, { name })
      } else {
        // Create new food in Firestore
        const foodData = {
          type: category,
          name,
          caloriesPer100g: food.caloriesPer100g,
          macroPer100g:
            category === "protein" ? food.proteinPer100g : category === "carbs" ? food.carbsPer100g : food.fatPer100g,
          weight: food.weight,
          userId: userEmail,
        }
        const id = await addFoodToFirestore(foodData, userEmail)
        if (id) {
          updatedFoods[category][index].id = id
          setFoods(updatedFoods)
        }
      }
    }

    // Reset editing state
    setEditingFood({
      category: null,
      index: null,
      name: "",
    })
  }

  // Method to cancel editing
  const cancelEditing = () => {
    setEditingFood({
      category: null,
      index: null,
      name: "",
    })
  }

  // Method to delete a food item
  const deleteFood = async (category, index) => {
    if (!userLoggedIn) return

    const updatedFoods = { ...foods }
    const foodToDelete = updatedFoods[category][index]

    // Remove from Firestore if it has an ID
    if (foodToDelete.id) {
      await deleteFoodFromFirestore(foodToDelete.id)
    }

    // Remove from state
    updatedFoods[category].splice(index, 1)
    setFoods(updatedFoods)

    // Force re-render to update calculations
    forceUpdate({})
  }

  // Method to calculate total nutrition for a category
  const calculateTotalForCategory = (category) => {
    if (!foods[category]) return { calories: 0, protein: 0, carbs: 0, fat: 0 }

    return foods[category].reduce(
      (totals, food) => {
        if (!food) return totals // Ensure food is valid
        const nutrition = food.getNutrition()
        totals.calories += nutrition.calories || 0
        if (nutrition.protein) totals.protein += nutrition.protein
        if (nutrition.carbs) totals.carbs += nutrition.carbs
        if (nutrition.fat) totals.fat += nutrition.fat
        return totals
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )
  }

  // Quick add food to a specific category
  const quickAddFood = async (category) => {
    if (!userLoggedIn) return // Only allow adding if logged in

    if (!newFood.name || !newFood.caloriesPer100g || !newFood.macroPer100g) {
      alert("Please fill in all fields")
      return
    }

    const newFoodItem = FoodFactory.createFood(
      category,
      newFood.name,
      Number.parseFloat(newFood.caloriesPer100g),
      Number.parseFloat(newFood.macroPer100g),
      Number.parseFloat(newFood.weight) || 0,
    )

    const updatedFoods = { ...foods }
    updatedFoods[category].push(newFoodItem)
    setFoods(updatedFoods)

    // Force re-render to update calculations
    forceUpdate({})

    // Add to Firestore if logged in
    if (userLoggedIn) {
      const foodData = {
        type: category,
        name: newFood.name,
        caloriesPer100g: Number.parseFloat(newFood.caloriesPer100g),
        macroPer100g: Number.parseFloat(newFood.macroPer100g),
        weight: Number.parseFloat(newFood.weight) || 0,
        userId: userEmail,
      }

      const id = await addFoodToFirestore(foodData, userEmail)
      if (id) {
        // Update the food item with the Firestore ID
        updatedFoods[category][updatedFoods[category].length - 1].id = id
        setFoods(updatedFoods)
      }
    }

    // Reset form and close quick add
    setNewFood({
      type: category,
      name: "",
      caloriesPer100g: "",
      macroPer100g: "",
      weight: "",
    })
    setQuickAddCategory(null)
  }

  // Handle adding new food
  const handleAddFood = async () => {
    if (!userLoggedIn) return // Only allow adding if logged in

    const { type, name, caloriesPer100g, macroPer100g, weight } = newFood

    if (!name || !caloriesPer100g || !macroPer100g) {
      alert("Please fill in all fields.")
      return
    }

    const newFoodItem = FoodFactory.createFood(
      type,
      name,
      Number.parseFloat(caloriesPer100g),
      Number.parseFloat(macroPer100g),
      Number.parseFloat(weight) || 0,
    )

    const updatedFoods = { ...foods }
    updatedFoods[type].push(newFoodItem)
    setFoods(updatedFoods)

    // Force re-render to update calculations
    forceUpdate({})

    // Add to Firestore if logged in
    if (userLoggedIn) {
      const foodData = {
        type,
        name,
        caloriesPer100g: Number.parseFloat(caloriesPer100g),
        macroPer100g: Number.parseFloat(macroPer100g),
        weight: Number.parseFloat(weight) || 0,
        userId: userEmail,
      }

      const id = await addFoodToFirestore(foodData, userEmail)
      if (id) {
        // Update the food item with the Firestore ID
        updatedFoods[type][updatedFoods[type].length - 1].id = id
        setFoods(updatedFoods)
      }
    }

    // Reset the form and hide it
    setNewFood({
      type: "protein",
      name: "",
      caloriesPer100g: "",
      macroPer100g: "",
      weight: "",
    })
    setShowAddFoodForm(false)
  }

  // Calculate totals for each category - recalculate on every render
  const proteinTotal = calculateTotalForCategory("protein")
  const carbsTotal = calculateTotalForCategory("carbs")
  const fatsTotal = calculateTotalForCategory("fats")

  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full h-64">
          <p className="text-xl">Checking authentication status...</p>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full h-64">
          <p className="text-xl">Loading your nutrition data...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 p-4 sm:p-8">
        {/* User Notification */}
        {!userLoggedIn && (
          <div className="w-full max-w-5xl mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center shadow-sm">
            Please log in to customize your food items and track your nutrition.
          </div>
        )}

        {/* Target Calories Box */}
        <div className="flex flex-col w-full sm:w-fit h-fit items-center justify-center bg-gradient-to-r from-[#8AC342] to-[#7ab33a] px-6 sm:px-8 py-4 rounded-xl shadow-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">Target Calories:</span>
            <input
              type="number"
              className="text-center border-b-2 font-medium text-xl sm:text-2xl border-white bg-transparent text-white p-2 w-24 sm:w-30 focus:outline-none"
              value={goalCalories}
              onChange={handleOnChange}
              placeholder=""
            />
          </div>
        </div>

        {/* Macronutrient Breakdown */}
        <MacronutrientSummary protein={protein} carbs={carbs} fat={fat} />

        {/* Food Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Protein List */}
          <FoodCategoryCard
            category="protein"
            foods={foods.protein}
            total={proteinTotal}
            userLoggedIn={userLoggedIn}
            editingFood={editingFood}
            quickAddCategory={quickAddCategory}
            newFood={newFood}
            onWeightChange={handleInputChange}
            onStartEditing={startEditingFood}
            onSaveEdit={saveEditedFood}
            onCancelEdit={cancelEditing}
            onDelete={deleteFood}
            onQuickAdd={() => setQuickAddCategory("protein")}
            onQuickAddSubmit={quickAddFood}
            onQuickAddCancel={() => setQuickAddCategory(null)}
            onNewFoodChange={setNewFood}
          />

          {/* Carbs List */}
          <FoodCategoryCard
            category="carbs"
            foods={foods.carbs}
            total={carbsTotal}
            userLoggedIn={userLoggedIn}
            editingFood={editingFood}
            quickAddCategory={quickAddCategory}
            newFood={newFood}
            onWeightChange={handleInputChange}
            onStartEditing={startEditingFood}
            onSaveEdit={saveEditedFood}
            onCancelEdit={cancelEditing}
            onDelete={deleteFood}
            onQuickAdd={() => setQuickAddCategory("carbs")}
            onQuickAddSubmit={quickAddFood}
            onQuickAddCancel={() => setQuickAddCategory(null)}
            onNewFoodChange={setNewFood}
          />

          {/* Fats List */}
          <FoodCategoryCard
            category="fats"
            foods={foods.fats}
            total={fatsTotal}
            userLoggedIn={userLoggedIn}
            editingFood={editingFood}
            quickAddCategory={quickAddCategory}
            newFood={newFood}
            onWeightChange={handleInputChange}
            onStartEditing={startEditingFood}
            onSaveEdit={saveEditedFood}
            onCancelEdit={cancelEditing}
            onDelete={deleteFood}
            onQuickAdd={() => setQuickAddCategory("fats")}
            onQuickAddSubmit={quickAddFood}
            onQuickAddCancel={() => setQuickAddCategory(null)}
            onNewFoodChange={setNewFood}
          />
        </div>

        {/* Add New Food Section - Only visible when logged in */}
        {userLoggedIn && (
          <div className="w-full max-w-5xl mt-8 mb-10">
            <button
              onClick={() => setShowAddFoodForm(!showAddFoodForm)}
              className="bg-gradient-to-r from-[#8AC342] to-[#7ab33a] text-white p-3 rounded-lg w-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              {showAddFoodForm ? "Hide Add New Food" : "Add New Food"}
            </button>

            {showAddFoodForm && (
              <AddFoodForm newFood={newFood} onNewFoodChange={setNewFood} onAddFood={handleAddFood} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Nutritions
