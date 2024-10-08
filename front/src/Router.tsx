// Router.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Planos from './components/Planos';
import ConfirmarPlano from './components/ConfirmarPlano';
import Pagamento from './components/Pagamento';
import Sucesso from './components/Sucesso';
import TrocarPlano from './components/TrocarPlano';
import ConfirmarTroca from './components/ConfirmarTroca';
import ContratoAtivo from './components/ContratoAtivo';
import HistoricoContratos from './components/HistoricoContratos';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Planos />} />
      <Route path="/confirmar-plano/:planId" element={<ConfirmarPlano />} />
      <Route path="/pagamento/:contractId" element={<Pagamento />} />
      <Route path="/sucesso" element={<Sucesso />} />
      <Route path="/trocar-plano" element={<TrocarPlano />} />
      <Route path="/confirmar-troca/:planId" element={<ConfirmarTroca />} />
      <Route path="/contrato-ativo" element={<ContratoAtivo />} />
      <Route path="/historico-contratos" element={<HistoricoContratos />} />
    </Routes>
  );
};

export default AppRouter;