// simula que estou recuperando um usuario logado da api
import { useEffect, useState } from 'react';
import { getAuthUser } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  credit: number;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAuthUser();
        console.log('Dados do usuário:', response);
        setUser(response);
      } catch (err) {
        setError('Erro');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAuth;