"use client"

const AddFoodForm = ({ newFood, onNewFoodChange, onAddFood }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-4 border border-[#8AC342]/20">
      <h2 className="text-xl font-semibold text-[#8AC342] text-center mb-4 pb-2 border-b">Add New Food</h2>
      <div className="flex flex-col space-y-4">
        {/* Food Type Dropdown */}
        <select
          value={newFood.type}
          onChange={(e) => onNewFoodChange({ ...newFood, type: e.target.value })}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC342]"
        >
          <option value="protein">Protein</option>
          <option value="carbs">Carbs</option>
          <option value="fats">Fats</option>
        </select>

        <input
          type="text"
          placeholder="Food Name"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC342]"
          value={newFood.name}
          onChange={(e) => onNewFoodChange({ ...newFood, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Calories per 100g"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC342]"
          value={newFood.caloriesPer100g}
          onChange={(e) => onNewFoodChange({ ...newFood, caloriesPer100g: e.target.value })}
        />
        <input
          type="number"
          placeholder={
            newFood.type === "protein"
              ? "Protein per 100g"
              : newFood.type === "carbs"
                ? "Carbs per 100g"
                : "Fat per 100g"
          }
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC342]"
          value={newFood.macroPer100g}
          onChange={(e) => onNewFoodChange({ ...newFood, macroPer100g: e.target.value })}
        />
        <input
          type="number"
          placeholder="Weight (g)"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AC342]"
          value={newFood.weight}
          onChange={(e) => onNewFoodChange({ ...newFood, weight: e.target.value })}
        />
        <button
          onClick={onAddFood}
          className="bg-[#8AC342] text-white p-3 rounded-lg mt-4 hover:bg-[#7ab33a] transition-colors"
        >
          Add Food
        </button>
      </div>
    </div>
  )
}

export default AddFoodForm
