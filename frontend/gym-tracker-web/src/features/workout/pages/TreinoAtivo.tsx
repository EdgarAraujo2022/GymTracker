// pages/TreinoAtivo.tsx
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, ChevronDown, ChevronRight, Plus, RefreshCw } from 'lucide-react';


interface SerieRegistrada {
    id: string;
    numero: number;
    repeticoes: number;
    peso: number;
    timestamp: Date;
}

interface Exercicio {
    id: number;
    nome: string;
    seriesSugeridas: number;
    repeticoesSugeridas: string;
    pesoSugerido: number;
    descansoSugerido: number;
    seriesRegistradas: SerieRegistrada[];
}

export default function TreinoAtivo() {
    const [tempo, setTempo] = useState(0);
    const [ativo, setAtivo] = useState(false);
    const [horaInicio, setHoraInicio] = useState(null);
    const [tempoPausado, setTempoPausado] = useState(0);
    const [exerciciosCompletos, setExercicioCompleto] = useState(0);
    const [modoPausado, setModoPausado] = useState(false);

    const [treinoAtual, setTreinoAtual] = useState(0);
    const [treinosCompletos, setTreinosCompletos] = useState([false, false, false]);
    const [exercicioExpandido, setExercicioExpandido] = useState<number | null>(null);
    const [descansoAtivo, setDescansoAtivo] = useState(false);
    const [tempoDescanso, setTempoDescanso] = useState(0);
    const [descansoTotal, setDescansoTotal] = useState(60);

    // Estados para inputs
    const [repsInput, setRepsInput] = useState<{ [key: number]: string }>({});
    const [pesoInput, setPesoInput] = useState<{ [key: number]: string }>({});

    // Dados mockados
    const [plano, setPlano] = useState({
        id: 1,
        nome: "Treino de Força",
        treinos: [
            {
                id: 1,
                nome: "Treino A - Superior",
                completo: false,
                exercicios: [
                    {
                        id: 101,
                        nome: "Supino Reto",
                        seriesSugeridas: 4,
                        repeticoesSugeridas: "10-12",
                        pesoSugerido: 80,
                        descansoSugerido: 60,
                        seriesRegistradas: [
                            { id: '1', numero: 1, repeticoes: 12, peso: 80, timestamp: new Date(), comentario: 'leve' },
                            { id: '2', numero: 2, repeticoes: 10, peso: 82, timestamp: new Date(), comentario: null },
                            { id: '3', numero: 3, repeticoes: 8, peso: 84, timestamp: new Date(), comentario: 'leve' }
                        ]
                    },
                    {
                        id: 102,
                        nome: "Puxada Frontal",
                        seriesSugeridas: 4,
                        repeticoesSugeridas: "12-15",
                        pesoSugerido: 70,
                        descansoSugerido: 60,
                        seriesRegistradas: [
                            { id: '4', numero: 1, repeticoes: 15, peso: 65, timestamp: new Date(), comentario: 'Leve' },
                            { id: '5', numero: 2, repeticoes: 13, peso: 67, timestamp: new Date(), comentario: 'leve' }
                        ]
                    },
                    {
                        id: 103,
                        nome: "Desenvolvimento",
                        seriesSugeridas: 3,
                        repeticoesSugeridas: "10-12",
                        pesoSugerido: 60,
                        descansoSugerido: 60,
                        seriesRegistradas: []
                    }
                ]
            },
            { id: 2, nome: "Treino B - Inferior", completo: false, exercicios: [] },
            { id: 3, nome: "Treino C - Full Body", completo: false, exercicios: [] },
        ]
    });

    const concluirTreino = () => {
        // Aqui você pode adicionar a lógica para marcar o treino como concluído
        // Por exemplo, avançar para o próximo treino, salvar progresso, etc.

        // Reset dos estados do timer
        setAtivo(false);
        setModoPausado(false);
        setHoraInicio(null);
        setTempo(0);
        setTempoPausado(0);

        // Aqui você pode chamar uma função para marcar o treino atual como concluído
        // onTreinoConcluido(); // se precisar passar pro componente pai

        // Mostrar uma mensagem de sucesso (opcional)
        // toast.success('Treino concluído com sucesso!');
    };
    const formatarHoraInicio = (date) => {
        if (!date) return '';
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    // Função para iniciar treino
    const iniciarTreino = () => {
        setAtivo(true);
        setHoraInicio(new Date());
        setModoPausado(false);
    };

    // Função para pausar/continuar
    const togglePausa = () => {
        if (ativo) {
            setAtivo(false);
            setModoPausado(true);
            setTempoPausado(tempo);
        } else {
            setAtivo(true);
            setModoPausado(false);
        }
    };

    // Função para reiniciar timer
    const reiniciarTimer = () => {
        setTempo(0);
        setHoraInicio(new Date());
        setAtivo(true);
        setModoPausado(false);
        setTempoPausado(0);
    };

    // Timer principal
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (ativo) {
            interval = setInterval(() => setTempo(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [ativo]);

    // Timer de descanso
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (descansoAtivo && tempoDescanso < descansoTotal) {
            interval = setInterval(() => setTempoDescanso(t => t + 0.1), 100);
        } else if (tempoDescanso >= descansoTotal) {
            setDescansoAtivo(false);
            setTempoDescanso(0);
        }
        return () => clearInterval(interval);
    }, [descansoAtivo, tempoDescanso, descansoTotal]);

    const exercicios = plano.treinos[treinoAtual].exercicios;

    const registrarSerie = (exercicioId: number) => {
        const reps = parseInt(repsInput[exercicioId] || '0');
        const peso = parseFloat(pesoInput[exercicioId] || '0');

        if (!reps || !peso) return;

        setPlano(prev => {
            const novoPlano = { ...prev };
            const exercicio = novoPlano.treinos[treinoAtual].exercicios.find(
                ex => ex.id === exercicioId
            );

            if (exercicio) {
                const novaSerie: SerieRegistrada = {
                    id: Date.now().toString(),
                    numero: exercicio.seriesRegistradas.length + 1,
                    repeticoes: reps,
                    peso: peso,
                    timestamp: new Date()
                };

                exercicio.seriesRegistradas.push(novaSerie);

                // Inicia descanso
                setDescansoTotal(exercicio.descansoSugerido);
                setTempoDescanso(0);
                setDescansoAtivo(true);

                if (exercicio.seriesRegistradas.length >= exercicio.seriesSugeridas) {
                    const currentIndex = novoPlano.treinos[treinoAtual].exercicios.findIndex(
                        ex => ex.id === exercicioId
                    );
                    const nextExercise = novoPlano.treinos[treinoAtual].exercicios[currentIndex + 1];
                    if (nextExercise) {
                        setExercicioExpandido(nextExercise.id);
                    }
                }
            }

            return novoPlano;
        });

        // Limpa inputs
        setRepsInput(prev => ({ ...prev, [exercicioId]: '' }));
        setPesoInput(prev => ({ ...prev, [exercicioId]: '' }));
    };

    // Verifica se todos os exercícios do treino atual estão completos
    const treinoCompleto = exercicios.every(ex =>
        ex.seriesRegistradas.length >= ex.seriesSugeridas
    );

    // Avança para próximo treino
    useEffect(() => {
        if (treinoCompleto && treinoAtual < plano.treinos.length - 1) {
            const novosCompletos = [...treinosCompletos];
            novosCompletos[treinoAtual] = true;
            setTreinosCompletos(novosCompletos);

            setTimeout(() => {
                setTreinoAtual(t => t + 1);
                setExercicioExpandido(null);
                setTempo(0);
                setAtivo(false);
            }, 1500);
        }
    }, [treinoCompleto]);

    const getProgressoExercicio = (ex: any) =>
        (ex.seriesRegistradas.length / ex.seriesSugeridas) * 100;

    const formatarTempo = (segundos: number) => {
        const mins = Math.floor(segundos / 60);
        const segs = Math.floor(segundos % 60);
        return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Progresso do Plano</h2>
                    <div className="space-y-2 sm:space-y-3">
                        {plano.treinos.map((treino, index) => (
                            <div
                                key={treino.id}
                                className={`flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors ${index === treinoAtual ? 'bg-blue-50 border border-blue-200' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0 flex items-center justify-center ${index < treinoAtual || treinosCompletos[index]
                                        ? 'bg-green-500 text-white'
                                        : index === treinoAtual
                                            ? 'bg-blue-500 text-white animate-pulse'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {index < treinoAtual || treinosCompletos[index] ? (
                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                        ) : (
                                            <span className="text-[10px] sm:text-xs">{index + 1}</span>
                                        )}
                                    </div>
                                    <span className={`truncate ${index === treinoAtual ? 'font-semibold text-blue-600' : 'text-gray-700'
                                        }`}>
                                        {treino.nome}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 ml-7 sm:ml-0">
                                    {index === treinoAtual && ativo && (
                                        <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-600 px-2 py-0.5 sm:py-1 rounded-full animate-pulse whitespace-nowrap">
                                            EM ANDAMENTO
                                        </span>
                                    )}
                                    {index < treinoAtual && (
                                        <span className="text-[10px] sm:text-xs text-green-600 font-medium whitespace-nowrap">
                                            ✓ CONCLUÍDO
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Barra de progresso geral */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                            <span>Progresso do plano</span>
                            <span className="font-medium">{treinosCompletos.filter(t => t).length}/{plano.treinos.length} treinos</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 sm:h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(treinosCompletos.filter(t => t).length / plano.treinos.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
                    {/* Cabeçalho com nome e timer */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{plano.treinos[treinoAtual].nome}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {exercicios.length} exercícios • {exercicios.reduce((acc, ex) => acc + ex.seriesSugeridas, 0)} séries
                            </p>
                        </div>

                        {/* Timer e hora de início */}
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 text-2xl font-mono font-bold text-gray-700">
                                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                {formatarTempo(tempo)}
                            </div>
                            {horaInicio && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                    <span>Início:</span>
                                    <span className="font-mono">{formatarHoraInicio(horaInicio)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status e progresso */}
                    <div className="mb-4">
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${ativo ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                    <span className="font-medium">
                                        {ativo ? 'Treinando' : modoPausado ? 'Pausado' : 'Pronto para começar'}
                                    </span>
                                </p>
                                <span className="text-gray-400 hidden xs:inline">•</span>
                                <span className="text-gray-500 text-xs hidden xs:block">
                                    {ativo ? 'Mantenha o ritmo!' : modoPausado ? 'Hora de respirar' : 'Bora começar?'}
                                </span>
                            </div>

                            {/* Controles do timer */}
                            <div className="flex items-center gap-2">
                                {!ativo && horaInicio && (
                                    <button
                                        onClick={reiniciarTimer}
                                        className="flex items-center gap-1 text-xs bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-2 py-1 rounded-full transition-colors"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                        <span>Reiniciar</span>
                                    </button>
                                )}

                                {/* Progresso dos exercícios */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                        {exerciciosCompletos}/{exercicios.length} ex.
                                    </span>
                                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all duration-300"
                                            style={{ width: `${(exerciciosCompletos / exercicios.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timer de descanso */}
                    {descansoAtivo && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-blue-700">Descanso</span>
                                    {!ativo && (
                                        <button
                                            onClick={reiniciarTimer}
                                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Reiniciar
                                        </button>
                                    )}
                                </div>
                                <span className="text-lg font-bold text-blue-700">
                                    {(descansoTotal - tempoDescanso).toFixed(1)}s
                                </span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                                    style={{ width: `${(1 - tempoDescanso / descansoTotal) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Botões de controle principais */}
                    <div className="mt-4 flex gap-2">
                        {!ativo && !modoPausado && !horaInicio ? (
                            // Estado inicial - só mostra Iniciar
                            <button
                                onClick={iniciarTreino}
                                className="flex-1 py-2 px-4 rounded-lg font-medium transition-colors bg-green-500 hover:bg-green-600 text-white"
                            >
                                Iniciar Treino
                            </button>
                        ) : (
                            // Treino em andamento ou pausado - mostra Pause/Continuar e Concluir
                            <>
                                <button
                                    onClick={togglePausa}
                                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${ativo
                                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                >
                                    {ativo ? 'Pausar' : 'Continuar'}
                                </button>

                                <button
                                    onClick={concluirTreino}
                                    className="flex-1 py-2 px-4 rounded-lg font-medium transition-colors bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Concluir
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {modoPausado && (
                    <button
                        onClick={reiniciarTimer}
                        className="mt-2 w-full py-2 px-4 rounded-lg font-medium transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reiniciar tempo do treino
                    </button>
                )}
                {ativo && (
                    <div>


                        {/* EXERCÍCIOS DO TREINO (accordion) */}
                        <div className="space-y-3 mb-6">
                            {exercicios.map((exercicio) => {
                                const progresso = getProgressoExercicio(exercicio);
                                const expandido = exercicioExpandido === exercicio.id;
                                const seriesFeitas = exercicio.seriesRegistradas.length;
                                const seriesTotal = exercicio.seriesSugeridas;
                                const completo = seriesFeitas >= seriesTotal;

                                return (
                                    <div key={exercicio.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        {/* Header do exercício */}
                                        <div
                                            className={`p-4 cursor-pointer transition-colors ${expandido ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'hover:bg-gray-50'
                                                }`}
                                            onClick={() => setExercicioExpandido(expandido ? null : exercicio.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 flex-1">
                                                    {expandido ? (
                                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                                    ) : (
                                                        <ChevronRight className="w-5 h-5 text-gray-500" />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800">{exercicio.nome}</h3>
                                                        <p className="text-xs text-gray-500">
                                                            {seriesFeitas}/{seriesTotal} séries • {exercicio.repeticoesSugeridas} reps • {exercicio.pesoSugerido}kg
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Status do exercício */}
                                                <div className="flex items-center gap-3">
                                                    {completo ? (
                                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" /> Completo
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                                            {seriesTotal - seriesFeitas} séries
                                                        </span>
                                                    )}
                                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className={`h-2 rounded-full transition-all duration-500 ${completo ? 'bg-green-500' : 'bg-blue-500'
                                                                }`}
                                                            style={{ width: `${progresso}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Conteúdo expandido */}
                                        {expandido && (
                                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                                {/* Séries registradas */}
                                                {exercicio.seriesRegistradas.length > 0 && (
                                                    <div className="mb-4">
                                                        <div className="space-y-2">
                                                            {exercicio.seriesRegistradas.map((serie) => (
                                                                <div className="mb-4">
                                                                    <h4 className="text-xs font-medium text-gray-500 mb-2">Séries realizadas</h4>
                                                                    <div className="space-y-4">
                                                                        {exercicio.seriesRegistradas.map((serie) => (
                                                                            <div key={serie.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                                                {/* Linha principal da série */}
                                                                                <div className="flex items-center justify-between p-3 text-sm bg-gray-50">
                                                                                    <div className="flex items-center gap-3">
                                                                                        <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xs">
                                                                                            {serie.numero}
                                                                                        </span>
                                                                                        <span className="text-gray-700 font-medium">
                                                                                            {serie.repeticoes} reps • {serie.peso}kg
                                                                                        </span>
                                                                                    </div>
                                                                                    <span className="text-xs text-gray-400">
                                                                                        {serie.timestamp.toLocaleTimeString()}
                                                                                    </span>
                                                                                </div>

                                                                                {/* Campo de comentário da série */}

                                                                                {/* Exemplo de sugestão baseado no comentário */}
                                                                                {serie.comentario && (
                                                                                    <div className="p-3 border-t border-gray-100">
                                                                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                                                                            <span>💡</span>
                                                                                            {serie.comentario}
                                                                                        </p>
                                                                                    </div>
                                                                                )}

                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Próxima série */}
                                                {!completo && (
                                                    <div className="border-t pt-4">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                            Série {seriesFeitas + 1} de {seriesTotal}
                                                        </h4>

                                                        {/* Container principal com flex-wrap para mobile */}
                                                        <div className="flex flex-col sm:flex-row gap-2">

                                                            {/* Container dos inputs - empilha no mobile, lado a lado no desktop */}
                                                            <div className="flex flex-col xs:flex-row gap-2 flex-1">

                                                                {/* Input Repetições */}
                                                                <div className="flex-1">
                                                                    <label className="block text-xs text-gray-500 mb-1 xs:hidden">
                                                                        Repetições
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        placeholder="Repetições"
                                                                        value={repsInput[exercicio.id] || ''}
                                                                        onChange={(e) => setRepsInput(prev => ({
                                                                            ...prev,
                                                                            [exercicio.id]: e.target.value
                                                                        }))}
                                                                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                                        min="0"
                                                                    />
                                                                </div>

                                                                {/* Input Peso */}
                                                                <div className="flex-1">
                                                                    <label className="block text-xs text-gray-500 mb-1 xs:hidden">
                                                                        Peso (kg)
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        placeholder="Peso (kg)"
                                                                        value={pesoInput[exercicio.id] || ''}
                                                                        onChange={(e) => setPesoInput(prev => ({
                                                                            ...prev,
                                                                            [exercicio.id]: e.target.value
                                                                        }))}
                                                                        className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                                        min="0"
                                                                        step="0.5"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Botão Registrar - ocupa largura total no mobile */}
                                                            <button
                                                                onClick={() => registrarSerie(exercicio.id)}
                                                                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                                <span>Registrar</span>
                                                            </button>
                                                        </div>

                                                        {/* Dica visual opcional */}
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            * Digite as repetições e peso da série atual
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}