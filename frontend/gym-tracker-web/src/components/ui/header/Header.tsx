import { Calendar, ChevronDown, Dumbbell, Menu, Ruler, Target, X } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const redirectBodyMeasurements = () => {
        navigate('/bodymeasurements');
        setIsMenuOpen(false);
    };

    const redirectWorkoutManager = () => {
        navigate('/workoutmanager');
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Logo e Título - Lado esquerdo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Dumbbell className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-800">GymTracker Pro</h1>
                            <p className="text-xs sm:text-sm text-gray-500 hidden xs:block">Sua evolução fitness</p>
                        </div>
                    </div>

                    {/* Menu Dropdown - Lado direito */}
                    <div className="relative">
                        <button
                            onClick={toggleMenu}
                            className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer flex items-center space-x-1"
                        >
                            <Menu className="w-4 h-4 sm:hidden" />
                            <span className="hidden sm:inline">Menu</span>
                            <ChevronDown className={`w-4 h-4 hidden sm:block transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown */}
                        {isMenuOpen && (
                            <>
                                {/* Overlay para mobile */}
                                <div 
                                    className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                                    onClick={() => setIsMenuOpen(false)}
                                />
                                
                                {/* Menu */}
                                <div className={`
                                    fixed sm:absolute 
                                    left-0 right-0 bottom-0 
                                    sm:left-auto sm:right-0 sm:top-full sm:bottom-auto sm:mt-2 
                                    sm:w-64
                                    bg-white 
                                    rounded-t-2xl sm:rounded-xl 
                                    shadow-xl border border-gray-200 
                                    py-4 sm:py-2 
                                    z-50
                                    animate-slide-up sm:animate-none
                                `}>
                                    {/* Indicador de drag (só mobile) */}
                                    <div className="sm:hidden flex justify-center mb-4">
                                        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                                    </div>

                                    {/* Header do menu mobile */}
                                    <div className="sm:hidden flex justify-between items-center px-4 mb-4">
                                        <h3 className="font-semibold text-gray-800">Menu</h3>
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>

                                    {/* Itens do Menu - Mobile e Desktop */}
                                    <div className="px-2">
                                        {/* Gerenciar Treinos */}
                                        <button
                                            onClick={redirectWorkoutManager}
                                            className="w-full text-left p-4 sm:p-3 hover:bg-gray-50 flex items-center space-x-3 sm:space-x-2 text-base sm:text-sm rounded-lg transition-colors"
                                        >
                                            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Ruler className="w-5 h-5 sm:w-4 sm:h-4 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">Gerenciar Treinos</p>
                                                <p className="text-xs text-gray-500 sm:hidden">Crie e edite seus treinos</p>
                                            </div>
                                        </button>

                                        {/* Registrar Medidas */}
                                        <button
                                            onClick={redirectBodyMeasurements}
                                            className="w-full text-left p-4 sm:p-3 hover:bg-gray-50 flex items-center space-x-3 sm:space-x-2 text-base sm:text-sm rounded-lg transition-colors"
                                        >
                                            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Ruler className="w-5 h-5 sm:w-4 sm:h-4 text-pink-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">Registrar Medidas</p>
                                                <p className="text-xs text-gray-500 sm:hidden">Acompanhe sua evolução</p>
                                            </div>
                                        </button>

                                        <div className="border-t my-2 sm:my-1"></div>

                                        {/* Histórico */}
                                        <button
                                            onClick={() => {
                                                console.log('Histórico');
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full text-left p-4 sm:p-3 hover:bg-gray-50 flex items-center space-x-3 sm:space-x-2 text-base sm:text-sm rounded-lg transition-colors"
                                        >
                                            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Calendar className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">Histórico</p>
                                                <p className="text-xs text-gray-500 sm:hidden">Veja seu progresso</p>
                                            </div>
                                        </button>

                                        {/* Metas */}
                                        <button
                                            onClick={() => {
                                                console.log('Metas');
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full text-left p-4 sm:p-3 hover:bg-gray-50 flex items-center space-x-3 sm:space-x-2 text-base sm:text-sm rounded-lg transition-colors"
                                        >
                                            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Target className="w-5 h-5 sm:w-4 sm:h-4 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">Metas</p>
                                                <p className="text-xs text-gray-500 sm:hidden">Defina seus objetivos</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};