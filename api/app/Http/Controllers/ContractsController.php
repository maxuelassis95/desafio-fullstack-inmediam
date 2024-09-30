<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Plan;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContractsController extends Controller
{
    
    public function store(Request $request) {

        try {

            // Simulando um usuario autenticado
            $user = getUser();

            Log::info('Iniciando validação');
            $validatedData = $request->validate([
                'plan_id' => 'required|exists:plans,id',
            ]);

            Log::info('Verificando se o usuario não possui contrato ativo');
            if (Contract::where('user_id', $user->id)
                ->where('active', true)->exists()) {

                    Log::error('Usúario já possui contrato ativo.');
                    return response()->json([
                        'message' => 'Você já possui um contrato ativo'
                    ]);

            }

            $plan = Plan::find($validatedData['plan_id']);
            Log::info('Verificando se o plano: [' . $plan->description . '] está ativo');
            if(!$plan->active) {
                Log::info('O plano: [' . $plan->description . '] não está ativo');
                return response()->json([
                    'message' => 'O plano escolhido não está ativo.'
                ]);
            }

            $contract = Contract::create([
                'user_id' => $user->id,
                'plan_id' => $validatedData['plan_id'],
                'active' => false,
                'note' => 'Contrato criado, aguardando pagamento',
            ]);
            //dd($contract);
            Log::info('Contrato criado com sucesso');

            return response()->json([
                'message' => 'Contrato criado com sucesso'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Erro ao realizar contratação: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erro ao realizar contratação'
            ], 422);
        }

    }

    public function active(): JsonResponse{
        
        // Simula o usuario autenticado
        $user = getUser(); 

        $active = Contract::where('user_id', $user->id)
        ->where('active', true)
        ->first();

        if(!$active) {
            return response()->json([
                'mensagem' => 'Nenhum contrato ativo foi encontrado',            
            ], 404);
        }

        return response()->json([
            'Nome: ' => User::find($active->user_id)->name,
            'Contrato ativo: ' => $active->plan->description,
            'Preço: ' => 'R$' . $active->plan->price,
        ], 200);
    }

}
