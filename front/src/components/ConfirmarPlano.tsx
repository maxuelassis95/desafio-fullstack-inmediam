import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createContract } from '../services/api';
import usePlans from '../hooks/usePlans';
import Layout from './Layout';

const ConfirmarPlano: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const { plans, loading } = usePlans();
  const navigate = useNavigate();

  if (loading) return <p>Carregando...</p>;

  const selectedPlan = plans.find((plan) => plan.id === Number(planId));

  if (!selectedPlan) return <p>Plano não encontrado!</p>;

  const handleConfirm = async () => {
    const contract = await createContract(selectedPlan.id);
    navigate(`/pagamento/${contract.contract_id}`);
  };

  return (
    <Layout>
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Confirmar Plano</h1>
      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold">{selectedPlan.description}</h2>
        <p className="mt-2">R${selectedPlan.price}</p>
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleConfirm}
        >
          Confirmar Plano
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default ConfirmarPlano;