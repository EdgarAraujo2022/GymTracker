export default function MyWorkouts() {
    const workouts = [
        { id: 1, name: "Peito e Tríceps", duration: "60 min", exercises: 8, calories: 420 },
        { id: 2, name: "Costas e Bíceps", duration: "70 min", exercises: 9, calories: 480 },
        { id: 3, name: "Pernas e Ombros", duration: "80 min", exercises: 10, calories: 550 },
    ];
    return (
        <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Meus Treinos</h3>
                <button className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                    Ver todos →
                </button>
            </div>

            <div className="space-y-4">
                {workouts.map((workout) => (
                    <div key={workout.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {workout.name}
                                </h4>
                                <div className="flex items-center mt-2 space-x-4 text-gray-600">
                                    <span className="flex items-center">
                                        ⏱️ {workout.duration}
                                    </span>
                                    <span className="flex items-center">
                                        🏋️ {workout.exercises} exercícios
                                    </span>
                                    <span className="flex items-center text-red-500">
                                        🔥 {workout.calories} cal
                                    </span>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                                Iniciar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
}