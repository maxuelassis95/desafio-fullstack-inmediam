import { useState, useEffect } from 'react';
import { getPlans } from '../services/api';

interface Plan {
  id: number;
  description: string;
  numberOfClients: number;
  gigabytesStorage: number;
  price: number;
}

const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      
      setLoading(false);
      setError(null); 

      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        setError('Erro ao carregar planos');
      } finally {
        setLoading(false);
      }

    };

    loadPlans();
  }, []);

  return { plans, loading, error };
};

export default usePlans;
