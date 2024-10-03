import React from 'react';
import useContractHistory from '../hooks/useContractHistory';
import Layout from './Layout';


const HistoricoContratos: React.FC = () => {
  const { contractHistory, loading, error } = useContractHistory();

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Histórico de Contratos</h1>
      {contractHistory.length === 0 ? (
        <p>Nenhum contrato encontrado.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID do Plano</th>
              <th className="py-2">Ativo</th>
              <th className="py-2">Nota</th>
            </tr>
          </thead>
          <tbody>
            {contractHistory.map(contract => (
              <tr key={contract.id}>
                <td className="border px-4 py-2">{contract.plan_id}</td>
                <td className="border px-4 py-2">{contract.active ? 'Sim' : 'Não'}</td>
                <td className="border px-4 py-2">{contract.note || 'Sem notas'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>
  );
};

export default HistoricoContratos;