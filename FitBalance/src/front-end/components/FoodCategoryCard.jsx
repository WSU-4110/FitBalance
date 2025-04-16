"use client"

import FoodList from "./FoodList"
import QuickAddForm from "./QuickAddForm"

const FoodCategoryCard = ({
  category,
  foods,
  total,
  userLoggedIn,
  editingFood,
  quickAddCategory,
  newFood,
  onWeightChange,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onQuickAdd,
  onQuickAddSubmit,
  onQuickAddCancel,
  onNewFoodChange,
}) => {
  // Format the category name for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  // Determine which total to display based on category
  const macroTotal = category === "protein" ? total.protein : category === "carbs" ? total.carbs : total.fat

  // Determine which macro label to display
  const macroLabel = category === "protein" ? "Protein" : category === "carbs" ? "Carbs" : "Fats"

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="bg-[#8AC342]/10 rounded-lg p-3 mb-4">
        <h2 className="text-xl font-semibold text-[#8AC342] text-center">{total.calories} Cal</h2>
        <h3 className="text-lg font-bold text-gray-800 text-center">{categoryName}</h3>
      </div>

      <FoodList
        category={category}
        foods={foods}
        userLoggedIn={userLoggedIn}
        editingFood={editingFood}
        onWeightChange={onWeightChange}
        onStartEditing={onStartEditing}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onDelete={onDelete}
        onQuickAdd={onQuickAdd}
      />

      {quickAddCategory === category && (
        <QuickAddForm
          category={category}
          newFood={newFood}
          onNewFoodChange={onNewFoodChange}
          onSubmit={() => onQuickAddSubmit(category)}
          onCancel={onQuickAddCancel}
        />
      )}

      {userLoggedIn && foods.length > 0 && (
        <button
          onClick={onQuickAdd}
          className="mt-4 text-[#8AC342] hover:underline text-sm flex items-center justify-center w-full"
        >
          + Add another {category} item
        </button>
      )}

      <div className="mt-4 text-center font-bold text-[#8AC342] pt-3 border-t">
        Total {macroLabel} = {macroTotal.toFixed(1)}g
      </div>
    </div>
  )
}

export default FoodCategoryCard
