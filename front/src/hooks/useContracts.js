import { useEffect, useState } from 'react';
import { fetchUserContracts } from '../services/api';

const useContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserContracts()
      .then((data) => {
        setContracts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar contratos:", error);
        setLoading(false);
      });
  }, []);

  return { contracts, loading };
};

export default useContracts;