import React from 'react'
import Layout from './Layout';


const Sucesso: React.FC = () => {
  return (
    <Layout>
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Sucesso!</h1>
      <p>O pagamento foi realizado com sucesso.</p>
    </div>
    </Layout>
  );
};

export default Sucesso;
