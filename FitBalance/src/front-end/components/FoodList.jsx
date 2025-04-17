"use client"

const FoodList = ({
  category,
  foods,
  userLoggedIn,
  editingFood,
  onWeightChange,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onQuickAdd,
  onNewFoodChange, // Added onNewFoodChange to props
}) => {
  if (foods.length === 0 && userLoggedIn) {
    return (
      <ul className="divide-y divide-gray-100 mb-4">
        <li className="text-center py-4">
          <button onClick={onQuickAdd} className="text-[#8AC342] hover:underline font-medium">
            + Add your meal
          </button>
        </li>
      </ul>
    )
  } else if (foods.length === 0) {
    return (
      <ul className="divide-y divide-gray-100 mb-4">
        <li className="text-center py-4 text-gray-500">No items added</li>
      </ul>
    )
  }

  return (
    <ul className="divide-y divide-gray-100 mb-4">
      {foods.map((food, index) => {
        const nutrition = food.getNutrition()
        const isEditing = editingFood.category === category && editingFood.index === index

        // Determine which macro to display based on category
        let macroDisplay = ""
        if (category === "protein" && nutrition.protein) {
          macroDisplay = `${nutrition.protein}g Protein`
        } else if (category === "carbs" && nutrition.carbs) {
          macroDisplay = `${nutrition.carbs}g Carbs`
        } else if (category === "fats" && nutrition.fat) {
          macroDisplay = `${nutrition.fat}g Fat`
        }

        return (
          <li key={index} className="py-3 border-b last:border-b-0">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    className="p-2 border rounded w-full"
                    value={editingFood.name}
                    onChange={(e) => onNewFoodChange({ ...editingFood, name: e.target.value })}
                    autoFocus
                  />
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={onSaveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Save
                  </button>
                  <button onClick={onCancelEdit} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center justify-between flex-grow">
                  <span
                    className={userLoggedIn ? "cursor-pointer hover:text-[#8AC342] font-medium" : "font-medium"}
                    onClick={() => userLoggedIn && onStartEditing(category, index)}
                  >
                    {food.name}
                  </span>
                  <div className="flex items-center gap-2 sm:hidden">
                    <input
                      type="number"
                      className={`w-16 min-w-[4rem] p-1 border rounded text-center ${!userLoggedIn ? "bg-gray-100" : ""}`}
                      placeholder="100"
                      value={food.weight}
                      onChange={(e) => onWeightChange(category, index, e.target.value)}
                      disabled={!userLoggedIn}
                    />
                    <span>g</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="hidden sm:flex items-center gap-2">
                    <input
                      type="number"
                      className={`w-16 min-w-[4rem] p-1 border rounded text-center ${!userLoggedIn ? "bg-gray-100" : ""}`}
                      placeholder="100"
                      value={food.weight}
                      onChange={(e) => onWeightChange(category, index, e.target.value)}
                      disabled={!userLoggedIn}
                    />
                    <span>g</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right whitespace-nowrap">
                      <span className="font-medium">{nutrition.calories} Cal</span>
                      <span className="ml-1 text-[#8AC342] hidden sm:inline">/ {macroDisplay}</span>
                    </div>

                    {userLoggedIn && (
                      <button
                        onClick={() => onDelete(category, index)}
                        className="ml-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center"
                        title="Delete item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile-only macro display */}
                <div className="sm:hidden text-[#8AC342] text-sm">{macroDisplay}</div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default FoodList
