// components/ExerciseForm.tsx

import { useState } from "react";
import type { ExerciseTypeResponseDto } from "../dto/exercise-type/exercise-type-response.dto";
import type { EditExerciseDto } from "../dto/exercise/edit-exercise.dto";
import type { ExerciseResponseDto } from "../dto/exercise/exercise-response.dto";
import { createPortal } from 'react-dom';


interface ExerciseFormProps {
    planId: string;
    workoutId: string;
    exercise?: any;
    isNew?: boolean;
    newExercise: any;
    setNewExercise: React.Dispatch<React.SetStateAction<EditExerciseDto>>;

    exerciseTypes: ExerciseTypeResponseDto[];
    exerciseList: ExerciseResponseDto[];
    isLoadingExercise: boolean;
    getExercise: (typeId: string) => void;
    onSave: (planId: string, workoutId: string, exerciseSetId: string) => void;
    onCancel: () => void;
}



export const ExerciseForm = ({
    planId,
    workoutId,
    exercise,
    isNew = false,
    newExercise,
    setNewExercise,
    exerciseTypes,
    exerciseList,
    isLoadingExercise,
    getExercise,
    onSave,
    onCancel
}: ExerciseFormProps) => {

    const [showExerciseSelector, setShowExerciseSelector] = useState(false);
    const [showWorkoutTypeSelector, setShowWorkoutTypeSelector] = useState(false);
    return (
        <div className="mt-2 mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-green-200">
            <h5 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">
                {isNew ? 'Novo Exercício' : 'Editar Exercício'}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3">
                {/* Tipo de Exercício */}
                <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Tipo de Exercício</label>

                    {/* Botão que mostra o tipo selecionado */}
                    <button
                        type="button"
                        onClick={() => setShowWorkoutTypeSelector(true)}
                        className="w-full px-3 py-2 border rounded-lg text-sm text-left bg-white"
                        style={{ minHeight: '38px' }}
                    >
                        {newExercise.exerciseTypeId
                            ? exerciseTypes.find(t => t.id === newExercise.exerciseTypeId)?.name
                            : 'Selecione o tipo'
                        }
                    </button>

                    {/* Modal para selecionar tipo */}
                    {showWorkoutTypeSelector && createPortal(
                        <div
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                            onClick={() => setShowWorkoutTypeSelector(false)}
                        >
                            <div className="absolute inset-0 bg-black/50" />

                            <div
                                className="relative bg-white w-full sm:w-96 rounded-t-xl sm:rounded-xl max-h-[80vh] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header - CORRIGIDO */}
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-medium text-gray-800">Selecione o tipo de exercício</h3>
                                    <button
                                        onClick={() => setShowWorkoutTypeSelector(false)}
                                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Lista de tipos */}
                                <div className="overflow-y-auto max-h-[60vh]">
                                    {exerciseTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                getExercise(type.id);
                                                setNewExercise(prev => ({ ...prev, exerciseTypeId: type.id }));
                                                setShowWorkoutTypeSelector(false);
                                            }}
                                            className={`w-full text-left px-4 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${newExercise.exerciseTypeId === type.id ? 'bg-green-50 text-green-700' : ''  // ← CORRIGIDO!
                                                }`}
                                        >
                                            <span className="font-medium">{type.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>,
                        document.body
                    )}
                </div>

                {/* Exercício */}
                <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Exercício</label>
                    {isLoadingExercise ? (
                           <div className="w-full px-3 py-2 border rounded-lg bg-gray-50 flex items-center justify-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                                <span className="text-sm text-gray-600">Carregando...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => setShowExerciseSelector(true)}
                                className="w-full px-3 py-2 border rounded-lg text-sm text-left bg-white"
                                style={{ minHeight: '38px' }}
                                disabled={!newExercise.exerciseTypeId}
                            >
                                {newExercise.exerciseId
                                    ? exerciseList.find(ex => ex.id === newExercise.exerciseId)?.name
                                    : 'Selecione o exercício'
                                }
                            </button>

                            {showExerciseSelector && createPortal(
                                <div
                                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                                    onClick={() => setShowExerciseSelector(false)}
                                >
                                    <div className="absolute inset-0 bg-black/50" />

                                    <div
                                        className="relative bg-white w-full sm:w-96 rounded-t-xl sm:rounded-xl max-h-[80vh] overflow-hidden"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-medium text-gray-800 text-base">Selecione o exercício</h3>
                                            <button
                                                onClick={() => setShowExerciseSelector(false)}
                                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="overflow-y-auto max-h-[60vh]">
                                            {exerciseList.map((exercise) => (
                                                <button
                                                    key={exercise.id}
                                                    onClick={() => {
                                                        setNewExercise(prev => ({ ...prev, exerciseId: exercise.id }));
                                                        setShowExerciseSelector(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${newExercise.exerciseId === exercise.id ? 'bg-green-50 text-green-700' : ''
                                                        }`}
                                                >
                                                    <span className="font-medium">{exercise.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>,
                                document.body
                            )}
                        </>
                    )}
                </div>

                {/* Séries */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Séries</label>
                    <input
                        type="number"
                        placeholder="Ex: 4"
                        value={newExercise.sets}
                        onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                {/* Repetições */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Repetições</label>
                    <input
                        type="text"
                        placeholder="Ex: 10-12"
                        value={newExercise.reps}
                        onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                {/* Peso */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Peso (kg)</label>
                    <input
                        type="number"
                        placeholder="Ex: 80"
                        value={newExercise.weight}
                        onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        step="0.5"
                    />
                </div>

                {/* Descanso */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Descanso (s)</label>
                    <input
                        type="number"
                        placeholder="Ex: 60"
                        value={newExercise.rest}
                        onChange={(e) => setNewExercise({ ...newExercise, rest: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                {/* Ordem */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Ordem</label>
                    <input
                        type="number"
                        placeholder="Ex: 1"
                        value={newExercise.order}
                        onChange={(e) => setNewExercise({ ...newExercise, order: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                {/* Botões */}
                <div className="sm:col-span-3 flex space-x-2 mt-2 sm:mt-4">
                    <button
                        onClick={() => onSave(planId, workoutId, exercise?.sets?.id)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};