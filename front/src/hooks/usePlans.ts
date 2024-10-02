import { useState, useEffect } from 'react';
import { getPlans } from '../services/api';

interface Plan {
  id: number;
  name: string;
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
