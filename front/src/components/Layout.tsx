// src/components/Layout.tsx
import React from 'react';
import useAuth from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  console.log('Usuário no Layout:', user);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sistema de Assinaturas</h1>
          <div className="text-right">
            <p className="font-semibold text-lg">{user?.name || 'Usuário Desconhecido'}</p>
            <p className="text-sm">Créditos: R${user?.credit || 0}</p>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="container mx-auto mt-8 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;