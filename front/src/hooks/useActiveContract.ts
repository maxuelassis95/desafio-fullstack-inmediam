import { useState, useEffect } from 'react';
import { getActiveContract } from '../services/api';

const useActiveContract = () => {
  const [activeContract, setActiveContract] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActiveContract = async () => {
      try {
        const response = await getActiveContract();
        setActiveContract(response);
      } catch (error) {
        console.error('Erro ao buscar contrato ativo', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveContract();
  }, []);

  return { activeContract, loading };
};

export default useActiveContract;
