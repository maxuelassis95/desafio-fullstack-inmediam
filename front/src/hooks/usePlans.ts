import { useEffect, useState } from 'react';
import { fetchPlans } from '../services/api';

const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans()
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar planos:", error);
        setLoading(false);
      });
  }, []);

  return { plans, loading };
};

export default usePlans;