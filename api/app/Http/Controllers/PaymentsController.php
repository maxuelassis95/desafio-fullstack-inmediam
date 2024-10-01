<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentsController extends Controller
{
    
    public function store(Request $request) {

        // Simula buscando usuario autenticado
        $user = getUser();

        try {
            Log::info('Validando dados de pagamento');
            $validatedData = $request->validate([
                'contract_id' => 'required',                
                'payment_method' => 'required'
            ]);

            // Busca dados relacioado com plano escolhido pelo usuario (Eager Loading)
            $contract = Contract::with('plan')->findOrFail($validatedData['contract_id']);
            
            if(!$contract->active) {

            // Preço real do plano
            $planPrice = $contract->plan->price; 
            Log::info('Preço do plano: ' . $planPrice);

            // Se o usuario possui crédito disponível, ele é aplicado
            $finalAmount = $planPrice - $user->credit;
            Log::info('Contract credit: ' . $user->credit);
            Log::info('Preço final: ' . $finalAmount);

            // Como o crédito foi usado, ele é zerado
            if ($user->credit > 0) {
                $user->update([
                    'credit' => 0,
                ]);
            }

            $paymentExisting = Payment::where('contract_id', $validatedData['contract_id'])
                                ->where('status', 'confirmed')
                                ->first();

            if($paymentExisting) {
                return response()->json([
                    'message' => 'Este pagamento já foi realizado'
                ], 400);
            }

            $payment = Payment::create([
                'contract_id' => $validatedData['contract_id'],
                'amount' => $finalAmount,
                'payment_method' => $validatedData['payment_method'],
                'status' => 'confirmed'

            ]);
            Log::info('Pagamento realizado com sucesso');

            if($payment->status == 'confirmed') {

                Log::info('Iniciando ativação do contrato');
                $contract->update([
                    'active' => true,
                    'note' => 'Pagamento confirmado. Contrato ativo'
                ]);

                Log::info('Contrato ativado com sucesso');

                return response()->json([
                    'message' => 'Pagamento realizado com sucesso, contrato ativado!',
                ], 200);

            } else {
                Log::info('Ocorreu uma falha no pagamento, contrato não foi ativado.');
                return response()->json([
                    'message' => 'Falha ao realizar o pagamento'
                ], 400);
            }
        } else {
            Log::error('Contrato já esta ativo');
            return response()->json([
                'message' => 'Este contrato já esta ativo',
            ], 400);
        }

        } catch (\Exception $e) {
            Log::error("Ocorreu um erro ao realizar pagamento: " . $e->getMessage());
            return response()->json([
                'message' => 'Erro ao realizar pagamento',
            ], 400);
        }

    }

}