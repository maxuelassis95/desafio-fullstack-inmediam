import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchPlans = async () => {
  const response = await api.get('/plans');
  return response.data;
};

export const createContract = async (planId) => {
  const response = await api.post('/contracts', { plan_id: planId });
  return response.data;
};

export const simulatePayment = async (contractId) => {
  const response = await api.post('/payments', { contract_id: contractId, method: 'PIX' });
  return response.data;
};

export const fetchUserContracts = async () => {
  const response = await api.get('/contracts/history');
  return response.data;
};

export const swapPlan = async (contractId, newPlanId) => {
    const response = await api.patch(`/change-plan/${contractId}`, { plan_id: newPlanId });
    return response.data;
};
