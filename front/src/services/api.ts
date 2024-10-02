import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getPlans = async () => {
  const response = await api.get('/plans');
  return response.data;
};

export const getActiveContract = async () => {
  const response = await api.get('/contracts/active');
  return response.data;
};

export const getContracts = async () => {
  const response = await api.get('/contracts/history');
  return response.data;
};

export const createContract = async (planId: number) => {
  const response = await api.post('/contracts', { plan_id: planId });
  return response.data;
};

export const simulatePayment = async (contractId: number) => {
  const response = await api.post('/payments', { contract_id: contractId, payment_method : "PIX" });
  return response.data;
};

export const changePlan = async (newPlanId: number) => {
  const response = await api.patch('/contracts/change-plan', { new_plan_id: newPlanId });
  return response.data;
};