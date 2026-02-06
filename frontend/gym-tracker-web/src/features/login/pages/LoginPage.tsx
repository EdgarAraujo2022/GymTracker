import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const { handleLogin, loading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // await handleLogin(email, password);
    redirectDashboard();

  }

  const navigate = useNavigate();

  const redirectDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-white text-3xl font-bold mb-12 text-center">
          Gym Tracker
        </h1>

        <form onSubmit={onSubmit} className="space-y-10">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                peer
                w-full
                bg-transparent
                border-b border-gray-500
                text-white
                py-2
                focus:outline-none
                focus:border-white
              " />
            <label
              className="
                absolute left-0 top-2
                text-gray-400
                transition-all
                pointer-events-none
                peer-focus:-top-4
                peer-focus:text-sm
                peer-focus:text-gray-300
                peer-valid:-top-4
                peer-valid:text-sm
              ">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                peer
                w-full
                bg-transparent
                border-b border-gray-500
                text-white
                py-2
                focus:outline-none
                focus:border-white
              "
            />
            <label
              className="
                absolute left-0 top-2
                text-gray-400
                transition-all
                pointer-events-none
                peer-focus:-top-4
                peer-focus:text-sm
                peer-focus:text-gray-300
                peer-valid:-top-4
                peer-valid:text-sm
              "
            >
              Senha
            </label>
          </div>
          <p className="text-gray-400 text-sm text-center mt-6">
            Não tem conta?{' '}
            <Link to="/register" className="text-white underline">
              Criar conta
            </Link>
          </p>


          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              border border-white
              text-white
              py-3
              rounded-full
              font-semibold
              hover:bg-white hover:text-black
              transition
              disabled:opacity-50
            "
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
