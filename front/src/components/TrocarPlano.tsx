import React from 'react';
import useActiveContract from '../hooks/useActiveContract';
import usePlans from '../hooks/usePlans';
import { useNavigate } from 'react-router-dom';

const TrocarPlano: React.FC = () => {
    const { activeContract, loading: loadingContract, error: errorContract } = useActiveContract();
    const { plans, loading: loadingPlans, error: errorPlans } = usePlans();
    const navigate = useNavigate();

    if (loadingContract || loadingPlans) return <p>Carregando...</p>;
    if (errorContract) return <p>{errorContract}</p>;
    if (errorPlans) return <p>{errorPlans}</p>;
    if (!activeContract) return <p>Nenhum contrato ativo encontrado.</p>;

    const currentPlanId = activeContract.plan.id;

    const handlePlanSelection = (planId: number) => {
        navigate(`/confirmar-troca/${planId}`);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Trocar Plano</h1>
            <h2 className="text-lg mb-2">Seu plano atual: {activeContract.plan.description}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map(plan => (
                    <div
                        key={plan.id}
                        className={`border p-4 rounded shadow-lg ${plan.id === currentPlanId ? 'opacity-50' : ''}`}
                    >
                        <h3 className="text-xl font-semibold">{plan.description}</h3>
                        <p className="mt-2">R${plan.price}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={plan.id === currentPlanId}
                            onClick={() => handlePlanSelection(plan.id)}
                        >
                            {plan.id === currentPlanId ? 'Este é o seu plano atual' : 'Trocar para este plano'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrocarPlano;