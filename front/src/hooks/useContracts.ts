import { useState, useEffect } from 'react';
import { getContracts } from '../services/api';

const useContracts = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await getContracts();
        setContracts(response);
      } catch (error) {
        console.error('Erro ao buscar contratos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  return { contracts, loading };
};

export default useContracts;
