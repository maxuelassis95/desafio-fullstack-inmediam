import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePlans from '../hooks/usePlans';
import useActiveContract from '../hooks/useActiveContract';

const TrocarPlano: React.FC = () => {
  const { plans, loading } = usePlans();
  const { activeContract, loading: contractLoading } = useActiveContract();
  const navigate = useNavigate();

  if (loading || contractLoading) return <p>Carregando...</p>;

  const handlePlanChange = (planId: number) => {
    navigate(`/confirmar-troca/${planId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Trocar Plano</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans
          .filter((plan) => plan.id !== activeContract?.plan_id) // Exclui o plano ativo
          .map((plan) => (
            <div key={plan.id} className="border p-4 rounded shadow-lg">
              <h2 className="text-xl font-semibold">{plan.description}</h2>
              <p className="mt-2">R${plan.price}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => handlePlanChange(plan.id)}
              >
                Selecionar para Troca
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrocarPlano;
