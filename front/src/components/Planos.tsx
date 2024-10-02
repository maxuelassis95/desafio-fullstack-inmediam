import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePlans from '../hooks/usePlans';
import useRedirectIfActiveContract from '../hooks/useRedirectIfActiveContract.tsx';

const Planos: React.FC = () => {

  // Redireciona se o usuario tem contrato ativo
  useRedirectIfActiveContract();

  const { plans, loading } = usePlans();
  const navigate = useNavigate();

  if (loading) return <p>Carregando planos...</p>;

  const handlePlanSelection = (planId: number) => {
    navigate(`/confirmar-plano/${planId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Selecione um Plano</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{plan.description}</h2>
            <p className="mt-4">Até {plan.numberOfClients} clientes</p>
            <p className="mt-4">Podendo usar até {plan.gigabytesStorage} GIGAS</p>
            <p className="mt-2">R${plan.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => handlePlanSelection(plan.id)}
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planos;
