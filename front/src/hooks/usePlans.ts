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

  useEffect(() => {
    const loadPlans = async () => {
      const data = await getPlans();
      setPlans(data);
      setLoading(false);
    };

    loadPlans();
  }, []);

  return { plans, loading };
};

export default usePlans;
