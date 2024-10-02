import { useEffect, useState } from 'react';
import { fetchUserContracts } from '../services/api';

const useActiveContract = () => {
  const [activeContract, setActiveContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserContracts()
      .then((data) => {
        setActiveContract(data.active);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar contrato ativo:", error);
        setLoading(false);
      });
  }, []);

  return { activeContract, loading };
};

export default useActiveContract;
