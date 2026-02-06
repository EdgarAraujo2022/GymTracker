import { Dumbbell, Trophy, TrendingUp, Calendar, Flame, Target, Ruler } from 'lucide-react';
import MyWorkouts from './components/MyWorkouts';
import { useNavigate  } from 'react-router-dom';


export default function DashboardPage() {
  const navigate = useNavigate();

  const redirectBodyMeasurements = () => {
    navigate('/bodymeasurements');
  };

  const stats = [
    { label: "Treinos na Semana", value: "4", icon: Calendar, color: "blue" },
    { label: "Calorias Totais", value: "2,050", icon: Flame, color: "red" },
    { label: "Dias Seguidos", value: "14", icon: Trophy, color: "yellow" },
    { label: "Progresso", value: "+7kg", icon: TrendingUp, color: "green" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">GymTracker Pro</h1>
                <p className="text-sm text-gray-500">Sua evolução fitness</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button onClick={redirectBodyMeasurements} className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center space-x-2 cursor-pointer">
                <Ruler className="w-4 h-4" />
                <span>Registrar Medidas</span>
              </button>

              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                + Novo Treino
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 to-red-500 rounded-3xl text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">Bem-vindo de volta, Edgar! 💪</h2>
            <p className="text-blue-100">Continue sua jornada fitness. Hoje é dia de evoluir!</p>
            <div className="mt-6 flex items-center space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <span className="font-semibold">Meta do mês:</span> +2kg massa muscular
              </div>
              <Target className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-600",
              red: "bg-red-100 text-red-600",
              yellow: "bg-yellow-100 text-yellow-600",
              green: "bg-green-100 text-green-600",
            };

            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <MyWorkouts />


          {/* Progress Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Progresso Semanal</h3>
              <div className="space-y-4">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
                  <div key={day} className="flex items-center">
                    <div className="w-12 text-gray-500">{day}</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-red-500 rounded-full"
                        style={{ width: `${60 + (index * 5)}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm font-semibold text-gray-700">
                      {60 + (index * 5)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  📊 Ver Estatísticas Detalhadas
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  🥗 Registrar Refeição
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  🎯 Definir Nova Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-500 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-800">GymTracker Pro</span>
              </div>
              <p className="text-gray-600 text-sm">
                Desenvolvido com React + TypeScript + Tailwind CSS v4
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500">
                Sistema de acompanhamento fitness
              </p>
              <p className="text-gray-400 text-sm mt-1">
                © {new Date().getFullYear()} - Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}