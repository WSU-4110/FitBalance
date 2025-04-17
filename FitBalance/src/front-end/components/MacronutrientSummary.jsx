const MacronutrientSummary = ({ protein, carbs, fat }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl mb-8">
        {/* Protein */}
        <div className="border-2 border-[#8AC342] rounded-xl p-4 flex flex-col items-center bg-white shadow-md transition-transform hover:scale-105">
          <h1 className="text-xl sm:text-2xl font-bold text-[#8AC342]">Protein</h1>
          <p className="text-lg sm:text-xl font-semibold">{protein} Calories</p>
        </div>
  
        {/* Carbs */}
        <div className="border-2 border-[#8AC342] rounded-xl p-4 flex flex-col items-center bg-white shadow-md transition-transform hover:scale-105">
          <h1 className="text-xl sm:text-2xl font-bold text-[#8AC342]">Carbs</h1>
          <p className="text-lg sm:text-xl font-semibold">{carbs} Calories</p>
        </div>
  
        {/* Fat */}
        <div className="border-2 border-[#8AC342] rounded-xl p-4 flex flex-col items-center bg-white shadow-md transition-transform hover:scale-105">
          <h1 className="text-xl sm:text-2xl font-bold text-[#8AC342]">Fat</h1>
          <p className="text-lg sm:text-xl font-semibold">{fat} Calories</p>
        </div>
      </div>
    )
  }
  
  export default MacronutrientSummary
  