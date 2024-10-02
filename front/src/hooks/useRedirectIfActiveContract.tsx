import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useActiveContract from './useActiveContract';

const useRedirectIfActiveContract = () => {
    const { activeContract, loading } = useActiveContract();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && activeContract) {
            navigate('/contrato-ativo');
        }
    }, [loading, activeContract, navigate]);
};

export default useRedirectIfActiveContract;
