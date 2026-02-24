import { Ruler, Save, TrendingDown, TrendingUp, History } from 'lucide-react';
import { useState } from 'react';
import { useBodyMeasurements } from "../hooks/useBodyMeasurements";

export default function BodyMeasurementsPage() {
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NmQ5YWYwZC01NTkwLTRkNzUtYWMyMC04NzJkMjEzM2U2NzciLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzY29wZSI6IiIsImNsaWVudF9pZCI6Imd5bS10cmFja2VyIiwiZXhwIjoxNzcwNDU4OTEzLCJpc3MiOiJBdXRoZW50aWNhdGlvbkFwcCIsImF1ZCI6IkF1dGhlbnRpY2F0aW9uQXBwLkFwaSJ9.wwhDP5Ww792qPkHTwKsgWaDU1XBGEkksOe8VLYypicY");

  const { data, loading, error } = useBodyMeasurements();

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    console.log(data);

  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    leftArm: '',
    rightArm: '',
    leftThigh: '',
    rightThigh: '',
    leftCalf: '',
    rightCalf: ''
  });

  const [measurementHistory, setMeasurementHistory] = useState([
    { date: '2024-01-15', chest: 100, waist: 85, hips: 95, weight: 75.5 },
    { date: '2024-01-08', chest: 101, waist: 86, hips: 96, weight: 76.2 },
    { date: '2024-01-01', chest: 102, waist: 88, hips: 97, weight: 77.0 },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você faria a lógica para salvar as medidas
    console.log('Medidas registradas:', measurements);
    
    // Simulação de sucesso
    alert('Medidas registradas com sucesso!');
    
    // Limpar formulário
    setMeasurements({
      chest: '',
      waist: '',
      hips: '',
      leftArm: '',
      rightArm: '',
      leftThigh: '',
      rightThigh: '',
      leftCalf: '',
      rightCalf: ''
    });
  };

  const getTrendIcon = (current, previous) => {
    if (current < previous) return <TrendingDown className="w-4 h-4 text-green-500" />;
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500" />;
    return <span className="text-gray-400">–</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
            <Ruler className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Medidas Corporais</h3>
            <p className="text-sm text-gray-500">Registre e acompanhe suas medidas</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2">
          <History className="w-4 h-4" />
          <span>Histórico</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Medidas do Tronco */}
              <div className="col-span-2">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Tronco
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peito (cm)
                    </label>
                    <input
                      type="number"
                      name="chest"
                      value={measurements.chest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ex: 100"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cintura (cm)
                    </label>
                    <input
                      type="number"
                      name="waist"
                      value={measurements.waist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ex: 85"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quadril (cm)
                    </label>
                    <input
                      type="number"
                      name="hips"
                      value={measurements.hips}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ex: 95"
                      step="0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Braços */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Braços
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Esquerdo (cm)
                    </label>
                    <input
                      type="number"
                      name="leftArm"
                      value={measurements.leftArm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 35"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Direito (cm)
                    </label>
                    <input
                      type="number"
                      name="rightArm"
                      value={measurements.rightArm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 35.5"
                      step="0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Pernas */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Pernas
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coxa Esq. (cm)
                    </label>
                    <input
                      type="number"
                      name="leftThigh"
                      value={measurements.leftThigh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ex: 55"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coxa Dir. (cm)
                    </label>
                    <input
                      type="number"
                      name="rightThigh"
                      value={measurements.rightThigh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ex: 55.5"
                      step="0.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Panturrilha Esq.
                      </label>
                      <input
                        type="number"
                        name="leftCalf"
                        value={measurements.leftCalf}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Ex: 38"
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Panturrilha Dir.
                      </label>
                      <input
                        type="number"
                        name="rightCalf"
                        value={measurements.rightCalf}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Ex: 38"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="pt-4 flex space-x-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Medidas</span>
              </button>
              <button
                type="button"
                onClick={() => setMeasurements({
                  chest: '100',
                  waist: '85',
                  hips: '95',
                  leftArm: '35',
                  rightArm: '35.5',
                  leftThigh: '55',
                  rightThigh: '55.5',
                  leftCalf: '38',
                  rightCalf: '38'
                })}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Preencher Exemplo
              </button>
            </div>
          </form>
        </div>

        {/* Histórico e Estatísticas */}
        <div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 mb-6">
            <h4 className="font-bold text-gray-800 mb-2">📈 Sua Evolução</h4>
            <p className="text-sm text-gray-600 mb-4">
              Compare com medições anteriores para acompanhar seu progresso
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">-2cm</div>
                <div className="text-xs text-gray-500">Cintura</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+1cm</div>
                <div className="text-xs text-gray-500">Peito</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">-0.5cm</div>
                <div className="text-xs text-gray-500">Quadril</div>
              </div>
            </div>
          </div>

          {/* Histórico Recente */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Histórico Recente</h4>
            <div className="space-y-3">
              {measurementHistory.map((record, index) => (
                <div key={record.date} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {record.weight}kg
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">Peito:</span>
                      <span className="font-medium">{record.chest}cm</span>
                      {index > 0 && getTrendIcon(record.chest, measurementHistory[index - 1].chest)}
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">Cintura:</span>
                      <span className="font-medium">{record.waist}cm</span>
                      {index > 0 && getTrendIcon(record.waist, measurementHistory[index - 1].waist)}
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">Quadril:</span>
                      <span className="font-medium">{record.hips}cm</span>
                      {index > 0 && getTrendIcon(record.hips, measurementHistory[index - 1].hips)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Dicas para Medição
            </h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Meça sempre no mesmo horário do dia</li>
              <li>• Use uma fita métrica flexível</li>
              <li>• Não puxe muito a fita para não comprimir</li>
              <li>• Anote medidas sempre em centímetros</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}