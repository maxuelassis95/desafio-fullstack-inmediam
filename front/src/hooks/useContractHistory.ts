import { useEffect, useState } from 'react';
import { getAuthUser, getContractsForUser } from '../services/api';

interface Contract {
  id: number;
  plan_id: number;
  active: boolean;
  note?: string;
}

const useContractHistory = () => {
  const [contractHistory, setContractHistory] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractHistory = async () => {
      try {
        const user = await getAuthUser();
        if (user && user.id) {
          const data = await getContractsForUser(user.id);
          setContractHistory(data);
        } else {
          setError('Usuário não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o histórico de contratos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContractHistory();
  }, []);

  return { contractHistory, loading, error };
};

export default useContractHistory;