"use client"

const QuickAddForm = ({ category, newFood, onNewFoodChange, onSubmit, onCancel }) => {
  const macroLabel =
    category === "protein" ? "Protein per 100g" : category === "carbs" ? "Carbs per 100g" : "Fat per 100g"

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-2 border border-[#8AC342]/20 animate-fadeIn">
      <h4 className="font-medium mb-3 text-[#8AC342] flex items-center">
        <span className="mr-2">+</span>
        Add {category.charAt(0).toUpperCase() + category.slice(1)}
      </h4>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Food Name"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8AC342] focus:outline-none"
          value={newFood.name}
          onChange={(e) => onNewFoodChange({ ...newFood, name: e.target.value })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Calories per 100g"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8AC342] focus:outline-none"
            value={newFood.caloriesPer100g}
            onChange={(e) => onNewFoodChange({ ...newFood, caloriesPer100g: e.target.value })}
          />
          <input
            type="number"
            placeholder={macroLabel}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8AC342] focus:outline-none"
            value={newFood.macroPer100g}
            onChange={(e) => onNewFoodChange({ ...newFood, macroPer100g: e.target.value })}
          />
        </div>
        <input
          type="number"
          placeholder="Weight (g)"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8AC342] focus:outline-none"
          value={newFood.weight}
          onChange={(e) => onNewFoodChange({ ...newFood, weight: e.target.value })}
        />
        <div className="flex space-x-2 pt-2">
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-[#8AC342] to-[#7ab33a] text-white px-4 py-2 rounded-lg flex-1 hover:shadow-md transition-shadow"
          >
            Add
          </button>
          <button
            onClick={onCancel}
            className="border border-gray-300 px-4 py-2 rounded-lg flex-1 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickAddForm
