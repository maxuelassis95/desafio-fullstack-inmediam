import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simulatePayment } from '../services/api';
import Layout from './Layout';

const Pagamento: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    try {
      await simulatePayment(Number(contractId));
      navigate('/sucesso');
    } catch (error) {
      console.error('Erro no pagamento', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Pagamento</h2>
      <p>Valor: R$100.00</p>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processando...' : 'Confirmar Pagamento'}
      </button>
    </div>
    </Layout>
  );
};

export default Pagamento;
