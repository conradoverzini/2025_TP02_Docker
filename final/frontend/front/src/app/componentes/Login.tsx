import React from 'react';

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-lg w-full">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Bienvenido de vuelta!
            </h2>
            <p className="mt-4 text-center text-gray-400">Ingresa para continuar</p>
            <form method="POST" action="#" className="mt-1 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">Usuario</label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required={true}
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">Contraseña</label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required={true}
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>


              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Ingresa
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">No tenes cuenta? </span>
            <a className="font-medium text-indigo-500 hover:text-indigo-400" href="#">
              Crear cuenta nueva
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/*const datosInicialesDesafio = {
    user: "",
    name: "",
    deadline: new Date().toISOString().split("T")[0],
    description: "",
    cost: 0,
    free: true,
    periodCheckpoint: "diario",
    
    priority: 1,
    progress: 0,
    category: "Deportes",
  };
  */

export default Login