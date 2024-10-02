import React from 'react';
import usePlans from '../hooks/usePlans';
import { useNavigate } from 'react-router-dom';

const Planos = () => {
  const { plans, loading } = usePlans();
  const navigate = useNavigate();

  if (loading) return <p>Carregando...</p>;

  const handlePlanSelection = (planId) => {
    navigate(`/planos/${planId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Selecione um Plano</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
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
