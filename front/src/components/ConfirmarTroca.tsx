import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { changePlan } from '../services/api';
import usePlans from '../hooks/usePlans';
import useActiveContract from '../hooks/useActiveContract';

const ConfirmarTroca: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const { plans, loading } = usePlans();
  const { activeContract, loading: contractLoading } = useActiveContract();
  const navigate = useNavigate();

  if (loading || contractLoading) return <p>Carregando...</p>;

  const newPlan = plans.find((plan) => plan.id === Number(planId));

  if (!newPlan || !activeContract) return <p>Erro: Planos não encontrados!</p>;

  const handlePlanChangeConfirmation = async () => {
    try {
      await changePlan(newPlan.id);
      navigate('/sucesso');
    } catch (error) {
      console.error('Erro ao trocar plano', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Confirmar Troca de Plano</h1>
      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Plano Atual: {activeContract.plan.name}</h2>
        <p className="mt-2">Valor: R${activeContract.plan.price}</p>

        <h2 className="text-xl font-semibold mt-4">Novo Plano: {newPlan.name}</h2>
        <p className="mt-2">Valor: R${newPlan.price}</p>

        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          onClick={handlePlanChangeConfirmation}
        >
          Confirmar Troca de Plano
        </button>
      </div>
    </div>
  );
};

export default ConfirmarTroca;