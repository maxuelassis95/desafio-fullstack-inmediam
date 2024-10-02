import { useState, useEffect } from 'react';
import { getActiveContract } from '../services/api';

const useActiveContract = () => {
  const [activeContract, setActiveContract] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchActiveContract = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await getActiveContract();
        setActiveContract(response);
      } catch (error) {
        console.error('Erro ao buscar contrato ativo', error);
        setError('Erro ao buscar contrato ativo'); 
      } finally {
        setLoading(false);
      }
    };

    fetchActiveContract();
  }, []);

  return { activeContract, loading, error };
};

export default useActiveContract;