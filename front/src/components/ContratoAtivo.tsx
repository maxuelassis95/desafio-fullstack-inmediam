import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContratoAtivo: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); 
    };

    return (
        <div className="container mx-auto mt-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Você já possui um contrato ativo!</h1>
            <p className="text-lg mb-6">
                Não é possível visualizar outros planos enquanto o seu contrato atual estiver ativo.
            </p>
            <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleGoBack}
            >
                Voltar para a página inicial
            </button>
        </div>
    );
};

export default ContratoAtivo;