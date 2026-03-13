import { Plus, Trash2, Edit2, ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useWorkoutManager } from '../hooks/useWorkoutManager';
import { workoutTypeService } from '../services/workout-type.service';
import { exerciseTypeService } from '../services/exercise-type.service';
import type { ExerciseTypeResponseDto } from '../dto/exercise-type/exercise-type-response.dto';
import type { ExerciseResponseDto } from '../dto/exercise/exercise-response.dto';
import { exerciseService } from '../services/exercise.service';
import { workoutPlanExerciseService } from '../services/workout-plan-exercise.service';
import { exerciseSetService } from '../services/exercise-set.service';
import type { ExerciseDto, WorkoutDto, WorkoutManagerResponseDto } from '../dto/workout-manager/workout-manager-response.dto';
import type { Exercise, Workout, WorkoutType } from '../dto/workout-manager/workout-manager.interface';
import React from 'react';
import type { WorkoutManagerExerciseFormDtoRequest } from '../dto/workout-manager/workout-manager-exercise-form.dto';
import type { ExerciseTypeRequestDto } from '../dto/exercise-type/create-exercise-type-request.dto';
import { workoutPlanService } from '../services/workout-plan.service';
import type { WorkoutPlanRequestDto } from '../dto/workout-plan/create-workout-plan.request.dto';
import type { WorkoutTypeRequestDto } from '../dto/workout-type/workout-type.request.dto';
import { MenuDropdown } from '../components/MenuDropdown';
import { toast } from 'react-toastify';
import { ExerciseForm } from '../components/ExerciseForm';
import type { EditExerciseDto } from '../dto/exercise/edit-exercise.dto';

export default function WorkoutManager() {
  const [deleteItem, setDeleteItem] = useState<{
    status: boolean;
    type: string;
    workoutTypeId?: string;
    workoutPlanId?: string;
    workoutPlanExercise?: string;
    description: string;
  } | null>(null);

  const [isLoadingExercise, setIsLoadingExercise] = useState(false);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseTypeResponseDto[]>([]);
  const [exerciseList, setExerciseList] = useState<ExerciseResponseDto[]>([]);
  const [showExerciseForm, setShowExerciseForm] = useState<WorkoutManagerExerciseFormDtoRequest>();;
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutType[]>([]);
  const { update: updateWorkoutType } = workoutTypeService;
  const { workoutmanager, loading, error } = useWorkoutManager();


  const [newExercise, setNewExercise] = useState<EditExerciseDto>({
    exerciseTypeId: '',
    exerciseId: '',
    sets: '',
    reps: '',
    rest: '',
    weight: '1',
    order: '1',
    workoutPlanExerciseId: ''
  });

  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WorkoutType>>({
    name: '',
    description: ''
  });


  // Inicio - Common
  const confirmDelete = () => {
    if (!deleteItem) return;

    if (deleteItem.type == 'WorkoutType') {
      confirmDeleteWorkoutType();
    } else if (deleteItem.type == 'WorkoutPlan') {
      confirmDeleteWorkoutPlan();
    } else if (deleteItem.type == 'Exercise') {
      confirmDeleteExercise()
    }

    toast.success(deleteItem.description + ' removido com sucesso!');
  }
  // Fim - Common

  // Inicio - Workout Type
  const handleAddWorkoutType = async () => {
    const dataWorkoutType: ExerciseTypeRequestDto = {
      name: 'Novo Treino',
      description: 'Descrição do treino',
      status: true
    };

    const returnWorkoutType = await workoutTypeService.create(dataWorkoutType);
    const newPlan = {
      id: returnWorkoutType?.id,
      name: "Novo Treino",
      description: "Descrição do treino",
      status: true,
      workouts: [],
      expanded: true,
    };
    setWorkoutPlans([...workoutPlans, newPlan]);
  };
  const expandWorkoutPlan = (workoutPlanId: string) => {
    setWorkoutPlans(plans =>
      plans.map(plan =>
        plan.id === workoutPlanId ? { ...plan, expanded: !plan.expanded } : plan
      )
    );
  }
  const startEditPlan = (plan: WorkoutType) => {
    setEditingPlan(plan.id);
    setEditForm({
      name: plan.name,
      description: plan.description
    });
  };
  const handleUpdateWorkoutType = async (workoutPlanId: string) => {
    const updateData: WorkoutTypeRequestDto = {
      name: editForm.name || 'Novo Treino',
      description: editForm.description || 'Descrição do treino',
      status: true
    };

    updateWorkoutType(workoutPlanId, updateData);

    await workoutTypeService.update(workoutPlanId, updateData);

    setWorkoutPlans((prevPlans: WorkoutType[]) =>
      prevPlans.map((plan: WorkoutType) =>
        plan.id === workoutPlanId
          ? {
            ...plan,
            name: editForm.name?.trim() || plan.name,
            description: editForm.description?.trim() || plan.description
          }
          : plan
      )
    );

    setEditingPlan(null);
    setEditForm({ name: '', description: '' });
  };
  const handleCancelEditWorkoutType = () => {
    setEditingPlan(null);
    setEditForm({ name: '', description: '' });
  };
  const handleDeleteWorkoutType = async (workoutTypeId: string) => {
    setDeleteItem({
      status: true,
      type: 'WorkoutType',
      workoutTypeId: workoutTypeId,
      description: 'treino'
    });
  };
  const confirmDeleteWorkoutType = async () => {
    if (!deleteItem) return;
    if (!deleteItem.workoutTypeId) return;

    try {
      await workoutTypeService.delete(deleteItem.workoutTypeId);

      setWorkoutPlans((prevPlans: WorkoutType[]) =>
        prevPlans.filter((plan: WorkoutType) => plan.id !== deleteItem.workoutTypeId)
      );

      setDeleteItem({
        status: false,
        type: '',
        workoutTypeId: '',
        description: ''
      });

    } catch (error) {
      console.error('Erro ao deletar o treino:', error);
    }
  }
  // Fim - Workout Type

  // Inicio - Workout Plan
  const handleAddWorkoutPlan = async (workoutPlanId: string) => {
    const dataWorkoutPlan: WorkoutPlanRequestDto = {
      name: 'Novo Treino',
      status: true
    };

    const returnWorkoutPlan = await workoutPlanService.create(workoutPlanId, dataWorkoutPlan);
    setWorkoutPlans(plans =>
      plans.map(plan =>
        plan.id === workoutPlanId
          ? {
            ...plan,
            workouts: [
              ...plan.workouts,
              {
                id: returnWorkoutPlan.id,
                name: dataWorkoutPlan.name,
                expanded: true,
                exercises: []
              }
            ]
          }
          : plan
      )
    );
  };
  const startEditWorkoutPlan = (workout: Workout) => {
    setEditingWorkout(workout.id);
    setEditWorkoutForm({
      name: workout.name
    });
  };
  const handleUpdateWorkoutPlan = (planId: string, workoutId: string) => {
    if (!editWorkoutForm.name.trim()) return;

    setWorkoutPlans((prev: WorkoutType[]) =>
      prev.map((plan: WorkoutType) =>
        plan.id === planId
          ? {
            ...plan,
            workouts: plan.workouts.map((workout: Workout) =>
              workout.id === workoutId
                ? {
                  ...workout,
                  name: editWorkoutForm.name.trim()
                }
                : workout
            )
          }
          : plan
      )
    );

    const dataWorkoutPlan: WorkoutPlanRequestDto = {
      name: editWorkoutForm.name.trim(),
      status: true
    };

    workoutPlanService.update(planId, workoutId, dataWorkoutPlan);

    // Limpar edição
    setEditingWorkout(null);
    setEditWorkoutForm({ name: '' });
  };
  const handleCancelEditWorkoutPlan = () => {
    setEditingWorkout(null);
    setEditWorkoutForm({ name: '' });
  };
  const handleDeleteWorkoutPlan = async (workoutTypeId: string, workoutPlanId: string) => {
    setDeleteItem({
      status: true,
      type: 'WorkoutPlan',
      description: 'Tipo de Treino',
      workoutTypeId: workoutTypeId,
      workoutPlanId: workoutPlanId
    });
  };
  const confirmDeleteWorkoutPlan = async () => {
    if (!deleteItem) return;
    if (!deleteItem.workoutTypeId || !deleteItem.workoutPlanId) return;
    try {
      await workoutPlanService.delete(deleteItem.workoutTypeId, deleteItem.workoutPlanId);

      setWorkoutPlans((prevPlans: WorkoutType[]) =>
        prevPlans.map((plan: WorkoutType) =>
          plan.id === deleteItem.workoutTypeId
            ? {
              ...plan,
              workouts: plan.workouts.filter((workout: Workout) =>
                workout.id !== deleteItem.workoutPlanId
              )
            }
            : plan
        )
      );

      setDeleteItem({
        status: false,
        type: '',
        workoutTypeId: '',
        description: ''
      });
    } catch (error) {
      console.error('Erro ao deletar o treino:', error);
    }
  }
  // Fim - Workout Plan

  // Inicio - Exercise
  const handleAddExercise = async (workoutTypeId: string, workoutPlanId: string) => {
    if (!newExercise.exerciseId || !newExercise.exerciseTypeId) return;

    const dataPlanExerciseCreate = {
      exerciseId: newExercise.exerciseId,
    };

    const workoutPlanExerciseCreate = await workoutPlanExerciseService.create(workoutTypeId, workoutPlanId, dataPlanExerciseCreate);

    const dataExerciseSet = {
      sets: parseInt(newExercise.sets),
      reps: parseInt(newExercise.reps),
      rest: parseInt(newExercise.rest),
      order: parseInt(newExercise.order),
      weight: parseFloat(newExercise.weight)
    };

    const resultExercise = await exerciseSetService.create(workoutTypeId, workoutPlanId, workoutPlanExerciseCreate.id, dataExerciseSet);


    reloadUi(workoutTypeId, workoutPlanId, resultExercise.workoutPlanExerciseId);
  };
  const resetExerciseForm = () => {
    setNewExercise({
      exerciseTypeId: '',
      exerciseId: '',
      sets: '',
      reps: '',
      rest: '',
      weight: '1',
      order: '1',
      workoutPlanExerciseId: ''
    });


    setShowExerciseForm({
      planId: '',
      workoutId: '',
      newExercise: false
    });
  };
  const startEditExercise = async (workoutTypeId: string, workoutPlanId: string, exercise: Exercise) => {
    setNewExercise({
      exerciseTypeId: exercise.exerciseTypeId || '',
      exerciseId: '',
      sets: exercise.sets?.sets?.toString() ?? '0',
      reps: exercise.sets?.reps?.toString() ?? '0',
      rest: exercise.sets?.rest?.toString() ?? '0',
      weight: exercise.sets?.weight?.toString() ?? '0',
      order: exercise.sets?.order?.toString() || '1',
      workoutPlanExerciseId: exercise.workoutPlanExerciseId
    });

    setShowExerciseForm({
      planId: workoutTypeId,
      workoutId: workoutPlanId
    });

    await getExercise(exercise.exerciseTypeId, () => {
      setNewExercise(prev => ({ ...prev, exerciseId: exercise.id }));
    });

    if (newExercise.workoutPlanExerciseId !== '') {
      setNewExercise(prev => ({ ...prev, exerciseId: exercise.id }));
    }

  };
  const handleUpdateExercise = async (workoutTypeId: string, workoutPlanId: string, exerciseSetId: string) => {
    if (!newExercise.exerciseId || !newExercise.exerciseTypeId) return;

    const dataExerciseSet = {
      sets: parseInt(newExercise.sets),
      reps: parseInt(newExercise.reps),
      rest: parseInt(newExercise.rest),
      order: parseInt(newExercise.order),
      weight: parseFloat(newExercise.weight)
    };

    await exerciseSetService.update(workoutTypeId, workoutPlanId, newExercise.workoutPlanExerciseId, exerciseSetId, dataExerciseSet);
    reloadUi(workoutTypeId, workoutPlanId, newExercise.workoutPlanExerciseId);
  };
  const handleDeleteExercise = async (workoutTypeId: string, workoutPlanId: string, workoutPlanExercise: string) => {
    setDeleteItem({
      status: true,
      type: 'Exercise',
      description: 'Exercício',
      workoutTypeId: workoutTypeId,
      workoutPlanId: workoutPlanId,
      workoutPlanExercise: workoutPlanExercise
    });
  };

  const confirmDeleteExercise = async () => {
    if (!deleteItem) return;
    if (!deleteItem.workoutTypeId || !deleteItem.workoutPlanId || !deleteItem.workoutPlanExercise) return;

    try {
      await exerciseService.delete(deleteItem.workoutTypeId, deleteItem.workoutPlanId, deleteItem.workoutPlanExercise);

      setWorkoutPlans((prev: WorkoutType[]) =>
        prev.map((plan: WorkoutType) =>
          plan.id === deleteItem.workoutTypeId
            ? {
              ...plan,
              workouts: plan.workouts.map((workout: Workout) =>
                workout.id === deleteItem.workoutPlanId
                  ? {
                    ...workout,
                    exercises: workout.exercises.filter(
                      (ex: Exercise) => ex.workoutPlanExerciseId !== deleteItem.workoutPlanExercise
                    )
                  }
                  : workout
              )
            }
            : plan
        )
      );

      setDeleteItem({
        status: false,
        type: '',
        workoutTypeId: '',
        description: ''
      });
    } catch (error) {
      console.error('Erro ao deletar exercício:', error);
    }
  }
  // Fim - Exercise

  const getExercise = async (exerciseTypeId: string, callback?: (exercises: ExerciseResponseDto[]) => void) => {
    setIsLoadingExercise(true);
    setNewExercise(prev => ({ ...prev, exerciseTypeId }));

    try {
      if (exerciseTypeId) {
        const exercises = await exerciseService.getAll(exerciseTypeId);
        setExerciseList(exercises);
        if (callback) {
          callback(exercises);
        }
      } else {
        setExerciseList([]);
      }
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error);
    } finally {
      setIsLoadingExercise(false);
    }
  };









  const reloadUi = (workoutTypeId: string, workoutPlanId: string, workoutPlanExerciseId: string) => {
    const selectedExercise = exerciseList.find(ex => ex.id === newExercise.exerciseId);
    const selectedType = exerciseTypes.find(type => type.id === newExercise.exerciseTypeId);

    const exerciseBaseData = {
      exerciseTypeId: selectedExercise?.exerciseTypeId || '',
      workoutPlanExerciseId: workoutPlanExerciseId,
      name: selectedExercise?.name || 'Exercício',
      sets: {
        id: newExercise.exerciseId,
        sets: parseInt(newExercise.sets),
        reps: parseInt(newExercise.reps),
        rest: parseInt(newExercise.rest),
        weight: parseFloat(newExercise.weight),
        muscle: selectedType?.name || '',
        order: 1
      }
    };

    setWorkoutPlans((prev: WorkoutType[]) =>
      prev.map((plan: WorkoutType) => {
        if (plan.id !== workoutTypeId) return plan;

        return {
          ...plan,
          workouts: plan.workouts.map((workout: Workout) => {
            if (workout.id !== workoutPlanId) return workout;

            const updatedExercises = newExercise.workoutPlanExerciseId
              ? workout.exercises.map((ex: Exercise) =>
                ex.workoutPlanExerciseId === newExercise.workoutPlanExerciseId
                  ? { ...ex, ...exerciseBaseData }
                  : ex
              )
              : [
                ...workout.exercises,
                {
                  id: workoutPlanExerciseId,
                  ...exerciseBaseData
                }
              ];

            return { ...workout, exercises: updatedExercises };
          })
        };
      })
    );

    resetExerciseForm();
    setShowExerciseForm(undefined);
  };

  const toggleWorkout = (workoutTypeId: string, workoutPlanId: string) => {
    setWorkoutPlans(plans =>
      plans.map(plan =>
        plan.id === workoutTypeId
          ? {
            ...plan,
            workouts: plan.workouts.map(workout =>
              workout.id === workoutPlanId
                ? { ...workout, expanded: !workout.expanded }
                : workout
            )
          }
          : plan
      )
    );
  };



  useEffect(() => {
    const fetchExerciseTypes = async () => {
      const data = await exerciseTypeService.getAll();
      setExerciseTypes(data);
    };
    fetchExerciseTypes();
  }, []);

  useEffect(() => {
    if (workoutmanager) {
      const plansWithExpand = workoutmanager.map((plan: WorkoutManagerResponseDto) => ({
        ...plan,
        expanded: false,
        workouts: plan.workouts?.map((workout: WorkoutDto) => ({
          ...workout,
          expanded: false,
          exercises: workout.exercises?.map((ex: ExerciseDto) => ({
            id: ex.id,
            name: ex.name,
            exerciseTypeId: ex.exerciseTypeId,
            workoutPlanExerciseId: ex.workoutPlanExerciseId,
            sets: {
              id: ex.sets?.id,
              sets: ex.sets?.sets,
              reps: ex.sets?.reps,
              rest: ex.sets?.rest,
              muscle: ex.sets?.muscle,
              weight: ex.sets?.weight,
              order: ex.sets?.order
            }
          })) || []
        })) || []
      }));

      setWorkoutPlans(plansWithExpand);
    }
  }, [workoutmanager]);

  const [editingWorkout, setEditingWorkout] = useState<string | null>(null);
  const [editWorkoutForm, setEditWorkoutForm] = useState({
    name: ''
  });





  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {/* Se precisar de algo à esquerda, coloca aqui */}

          <button
            onClick={handleAddWorkoutType}
            className="ml-auto px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer flex items-center">
            <Plus className="w-4 h-4" />
            <span></span>
          </button>
        </div>

        {/* Lista de Planos de Treino */}
        <div className="space-y-3 sm:space-y-4">
          {workoutPlans.map(plan => (
            <div key={plan.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => expandWorkoutPlan(plan.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    {plan.expanded ?
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" /> :
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    }
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">{plan.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{plan.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <div className="flex-shrink-0 ml-2">
                      <MenuDropdown
                        items={[
                          {
                            label: 'Editar Plano',
                            icon: <Edit2 className="w-4 h-4 text-gray-600" />,
                            onClick: () => startEditPlan(plan)
                          },
                          {
                            label: 'Adicionar Plano',
                            icon: <Plus className="w-4 h-4 text-green-600" />,
                            onClick: () => {
                              resetExerciseForm();
                              handleAddWorkoutPlan(plan.id);
                            }
                          },
                          {
                            label: 'Excluir Treino',
                            icon: <Trash2 className="w-4 h-4 text-red-500" />,
                            onClick: () => handleDeleteWorkoutType(plan.id),
                            color: 'text-red-600',
                            divider: true
                          }
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {editingPlan === plan.id && (
                <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-200" onClick={(e) => e.stopPropagation()}>
                  <h5 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">Editando Plano</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="px-3 py-2 border rounded-lg text-sm"
                      placeholder="Nome do plano" />
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="px-3 py-2 border rounded-lg text-sm"
                      placeholder="Descrição do plano" />
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleUpdateWorkoutType(plan.id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                      Salvar
                    </button>
                    <button
                      onClick={handleCancelEditWorkoutType}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
                      Cancelar
                    </button>
                  </div>
                </div>
              )}



              {plan.expanded && (
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {plan.workouts.map(workout => (
                    <div key={workout.id} className="border-l-2 border-green-200 pl-3 sm:pl-4">

                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center space-x-1 flex-1 min-w-0 cursor-pointer  rounded-lg p-1"
                          onClick={() => toggleWorkout(plan.id, workout.id)}
                        >
                          {workout.expanded ?
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" /> :
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          }
                          <span className="font-semibold text-gray-700 text-sm sm:text-base truncate">
                            {workout.name}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1">
                            {workout.exercises.length} ex
                          </span>
                        </div>

                        <div className="flex-shrink-0 ml-2">
                          <MenuDropdown
                            items={[
                              {
                                label: 'Editar Treino',
                                icon: <Edit2 className="w-4 h-4 text-gray-600" />,
                                onClick: () => startEditWorkoutPlan(workout)
                              },
                              {
                                label: 'Adicionar Exercício',
                                icon: <Plus className="w-4 h-4 text-green-600" />,
                                onClick: () => {
                                  resetExerciseForm();
                                  setShowExerciseForm(prev => ({
                                    ...prev,
                                    newExercise: true
                                  }));
                                  setShowExerciseForm({ planId: plan.id, workoutId: workout.id, newExercise: true });
                                }
                              },
                              {
                                label: 'Excluir Treino',
                                icon: <Trash2 className="w-4 h-4 text-red-500" />,
                                onClick: () => handleDeleteWorkoutPlan(plan.id, workout.id),
                                color: 'text-red-600',
                                divider: true
                              }
                            ]}
                          />
                        </div>
                      </div>

                      {/* FORMULÁRIO DE EDIÇÃO DO WORKOUT (aparece abaixo do cabeçalho) */}
                      {editingWorkout === workout.id && (
                        <div className="mt-2 p-3 sm:p-4 bg-gray-50 rounded-lg border border-blue-200" onClick={(e) => e.stopPropagation()}>
                          <h5 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">Editar Treino</h5>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="text"
                              value={editWorkoutForm.name}
                              onChange={(e) => setEditWorkoutForm({ name: e.target.value })}
                              className="flex-1 px-3 py-2 border rounded-lg text-sm"
                              placeholder="Nome do treino"
                              autoFocus
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdateWorkoutPlan(plan.id, workout.id)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                              >
                                Salvar
                              </button>
                              <button
                                onClick={handleCancelEditWorkoutPlan}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Lista de Exercícios */}
                      {workout.expanded && (
                        <div className="mt-2 sm:mt-3 space-y-2">
                          {workout.exercises.length > 0 && (
                            <div className="hidden sm:block overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-left text-gray-500 border-b">
                                    <th className="pb-2 pr-4">Exercício</th>
                                    <th className="pb-2 pr-4">Séries</th>
                                    <th className="pb-2 pr-4">Repetições</th>
                                    <th className="pb-2 pr-4">Descanso</th>
                                    <th className="pb-2 pr-4">Músculo</th>
                                    <th className="pb-2 pr-4">Ordem</th>
                                    <th className="pb-2"></th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {workout.exercises.map(exercise => (
                                    <React.Fragment key={exercise.workoutPlanExerciseId}>
                                      <tr key={exercise.workoutPlanExerciseId} className="hover:bg-gray-50">
                                        <td className="py-2 pr-4 font-medium">{exercise.name}</td>
                                        <td className="py-2 pr-4">{exercise.sets?.sets || 0}</td>
                                        <td className="py-2 pr-4">{exercise.sets?.reps || 0}</td>
                                        <td className="py-2 pr-4">{exercise.sets?.rest || 0}s</td>
                                        <td className="py-2 pr-4">
                                          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                                            {exercise.sets?.muscle || ''}
                                          </span>
                                        </td>
                                        <td className="py-2 pr-4">{exercise.sets?.order || 0}</td>
                                        <td className="py-2">
                                          <div className="flex gap-2">
                                            <div className="flex-shrink-0 ml-2">

                                              <MenuDropdown
                                                items={[
                                                  {
                                                    label: 'Editar Exercício',
                                                    icon: <Edit2 className="w-4 h-4 text-gray-600" />,
                                                    onClick: () => {
                                                      startEditExercise(plan.id, workout.id, exercise);
                                                    }
                                                  },
                                                  {
                                                    label: 'Excluir Exercício',
                                                    icon: <Trash2 className="w-4 h-4 text-red-500" />,
                                                    onClick: () => handleDeleteExercise(plan.id, workout.id, exercise.workoutPlanExerciseId),
                                                    color: 'text-red-600',
                                                    divider: true
                                                  }
                                                ]}
                                              />
                                            </div>

                                          </div>
                                        </td>
                                      </tr>

                                      {
                                        newExercise.workoutPlanExerciseId === exercise.workoutPlanExerciseId && (
                                          <tr>
                                            <td colSpan={7} className="p-0">
                                              <ExerciseForm
                                                planId={plan.id}
                                                workoutId={workout.id}
                                                exercise={exercise}
                                                newExercise={newExercise}
                                                setNewExercise={setNewExercise}
                                                exerciseTypes={exerciseTypes}
                                                exerciseList={exerciseList}
                                                isLoadingExercise={isLoadingExercise}
                                                getExercise={getExercise}
                                                onSave={handleUpdateExercise}
                                                onCancel={resetExerciseForm}
                                              />
                                            </td>
                                          </tr>
                                        )
                                      }
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {
                            showExerciseForm?.newExercise && (
                              <div className="mt-2 mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-green-200">
                                <ExerciseForm
                                  planId={plan.id}
                                  workoutId={workout.id}
                                  exercise={null}
                                  newExercise={newExercise}
                                  setNewExercise={setNewExercise}
                                  exerciseTypes={exerciseTypes}
                                  exerciseList={exerciseList}
                                  isLoadingExercise={isLoadingExercise}
                                  getExercise={getExercise}
                                  onSave={handleAddExercise}
                                  onCancel={resetExerciseForm}
                                />
                              </div>
                            )
                          }

                          {/* Versão Mobile - Cards (UMA ÚNICA VEZ) */}
                          <div className="sm:hidden space-y-3">
                            {workout.exercises.map(exercise => (
                              <div key={exercise.workoutPlanExerciseId} className="bg-gray-50 p-3 rounded-lg border border-gray-200">

                                {/* Cabeçalho com nome e botão deletar */}
                                <div className="flex justify-between items-center mb-2">
                                  <h5 className="font-medium text-gray-800">{exercise.name}</h5>
                                  <MenuDropdown
                                    items={[
                                      {
                                        label: 'Editar Exercício',
                                        icon: <Edit2 className="w-4 h-4 text-gray-600" />,
                                        onClick: () => {
                                          startEditExercise(plan.id, workout.id, exercise);
                                        }
                                      },
                                      {
                                        label: 'Excluir Exercício',
                                        icon: <Trash2 className="w-4 h-4 text-red-500" />,
                                        onClick: () => handleDeleteExercise(plan.id, workout.id, exercise.workoutPlanExerciseId),
                                        color: 'text-red-600',
                                        divider: true
                                      }
                                    ]}
                                  />
                                </div>

                                {/* Detalhes do exercício em formato de lista vertical */}
                                <div className="space-y-2 pt-2 border-t border-gray-200">

                                  {/* Séries */}
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Séries</span>
                                    <span className="font-medium text-gray-800">{exercise.sets?.sets || 0}x</span>
                                  </div>

                                  {/* Repetições */}
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Repetições</span>
                                    <span className="font-medium text-gray-800">{exercise.sets?.reps || 0}</span>
                                  </div>

                                  {/* Peso */}
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Peso</span>
                                    <span className="font-medium text-gray-800">{exercise.sets?.weight || 0}kg</span>
                                  </div>

                                  {/* Descanso */}
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Descanso</span>
                                    <span className="font-medium text-gray-800">{exercise.sets?.rest || 0}s</span>
                                  </div>

                                  {/* Músculo */}
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Músculo</span>
                                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                                      {exercise.sets?.muscle || ''}
                                    </span>
                                  </div>

                                  {/* Ordem */}
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Ordem</span>
                                    <span className="font-medium text-gray-800">{exercise.sets?.order || 0}</span>
                                  </div>
                                </div>
                                {
                                  newExercise.workoutPlanExerciseId === exercise.workoutPlanExerciseId && (
                                    <div className="mt-2 mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-green-200">
                                      <ExerciseForm
                                        planId={plan.id}
                                        workoutId={workout.id}
                                        exercise={exercise}
                                        newExercise={newExercise}
                                        setNewExercise={setNewExercise}
                                        exerciseTypes={exerciseTypes}
                                        exerciseList={exerciseList}
                                        isLoadingExercise={isLoadingExercise}
                                        getExercise={getExercise}
                                        onSave={handleUpdateExercise}
                                        onCancel={resetExerciseForm}
                                      />
                                    </div>

                                  )}
                              </div>
                            ))}
                          </div>

                          {workout.exercises.length === 0 && (
                            <div className="text-center py-6 sm:py-8 text-gray-500">
                              <p className="text-sm sm:text-base">Nenhum exercicio cadastrado neste treino</p>
                              <button
                                onClick={() => setShowExerciseForm({
                                  planId: plan.id,
                                  workoutId: workout.id
                                })}
                                className="mt-2 text-sm sm:text-base text-green-600 hover:text-green-700 font-medium">
                                + Adicionar primeiro exercicio
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resumo dos Treinos - Responsivo */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl">
            <p className="text-xs sm:text-sm text-gray-600">Total de Planos</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{workoutPlans.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl">
            <p className="text-xs sm:text-sm text-gray-600">Total de Treinos</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              {workoutPlans.reduce((acc, plan) => acc + plan.workouts.length, 0)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl">
            <p className="text-xs sm:text-sm text-gray-600">Total de Exercícios</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              {workoutPlans.reduce((acc, plan) =>
                acc + plan.workouts.reduce((sum, workout) =>
                  sum + workout.exercises.length, 0
                ), 0
              )}
            </p>
          </div>
        </div>

        {/* Modal de confirmação de exclusão */}
        {
          deleteItem?.status && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              {/* Overlay com fade */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => {
                  setDeleteItem({ ...deleteItem, status: false });
                  // setExerciseToDelete(null);
                }}
              />

              {/* Modal com animação de escala */}
              <div className="relative bg-white rounded-xl max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Confirmar exclusão</h3>
                <p className="text-gray-600 mb-6">
                  Tem certeza que deseja excluir este {deleteItem?.description}? Esta ação não pode ser desfeita.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Sim, excluir
                  </button>
                  <button
                    onClick={() => {
                      setDeleteItem({ ...deleteItem, status: false, type: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )
        }



      </main >
    </div >

  );
}