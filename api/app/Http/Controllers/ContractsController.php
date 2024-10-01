<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Carbon\Carbon;
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

            Log::info('Iniciando validação de dados');
            $validatedData = $request->validate([
                'plan_id' => 'required|exists:plans,id',
            ]);

            Log::info('Verificando se o usuario não possui contrato ativo');
            if (Contract::where('user_id', $user->id)
                ->where('active', true)->exists()) {

                    Log::error('Usúario já possui contrato ativo.');
                    return response()->json([
                        'message' => 'Você já possui um contrato ativo, você precisa alterar o plano'
                    ], 400);

            }

            $plan = Plan::find($validatedData['plan_id']);

            Log::info('Verificando se o plano: [' . $plan->description . '] está ativo');
            if(!$plan->active) {
                Log::error('O plano: [' . $plan->description . '] não está ativo');
                return response()->json([
                    'message' => 'O plano escolhido não está ativo.'
                ], 400);
            }

            $contract = Contract::create([
                'user_id' => $user->id,
                'plan_id' => $validatedData['plan_id'],
                'active' => false,
                'note' => 'Contrato criado, aguardando pagamento',
            ]);
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

    public function update(Request $request) {

        $validatedData = $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        // Obtém o usuário (simulado)
        $user = getUser();

        // Busca o contrato ativo atual
        $currentContract = Contract::where('user_id', $user->id)
            ->where('active', true)
            ->first();

        // Se não houver contrato ativo, retorna erro
        if (!$currentContract) {
            return response()->json(['message' => 'Não existe contrato ativo para troca de plano.'], 404);
        }

        // Calcula o ajuste de preço baseado no plano atual e a quantidade de dias restantes
        $currentPlan = $currentContract->plan;
        $newPlan = Plan::findOrFail($validatedData['plan_id']);
        $currentDate = Carbon::now();

        if($currentPlan->id == $validatedData['plan_id']) {
            return response()->json([
                'message' => 'Você não pode alterar seu plano atual para um igual',
            ], 400);
        }

        // Calcula os dias restantes no plano atual
        $startDate = new Carbon($currentContract->created_at);
        $endDate = $startDate->copy()->addMonth(); // Supondo ciclo mensal
        $currentDate = Carbon::now(); // Data atual

        // Calcula os dias restantes
        $remainingDays = $currentDate->diffInDays($endDate, false);

        // Log dos dados para depuração
        Log::info('Dados: \n CD: ' . $currentDate . ' - SD: ' . $startDate . ' - ED: ' . $endDate . ' - RD: ' . $remainingDays);

        // Calcula crédito ao trocar o plano
        $priceAdjustment = 0;
        if ($remainingDays > 0) {
            $dailyRate = $currentPlan->price / 30;
            $priceAdjustment = $dailyRate * $remainingDays;
        }

        Log::info('Crédito atual: ' . $user->credit);
        Log::info('Price adjustment: ' . $priceAdjustment);

        // Salva os créditos do usuario
        User::find($user->id)->update([
            'credit' => getUser()->credit + $priceAdjustment,
        ]);

        Log::info(' Novo crédito: ' . $priceAdjustment);
        Log::info('Adicionando ao usuario o valor de créditos que ele recebeu na troca de plano');

        // Cria o novo contrato
        $newContract = Contract::create([
            'user_id' => $user->id,
            'plan_id' => $newPlan->id,
            'active' => false,
            'note' => 'Troca de plano com ajuste de preço. Aguardando pagamento',
        ]);
        Log::info('Contrato criado, mas ainda não pago... ');

        // Desativa o contrato atual
        $currentContract->update([
            'active' => false,
            'note' => 'Contrato desativado, pois houve troca de plano.'
        ]);
        Log::info('Contrato antigo desativado. ');

        // Se o plano atual for mais barato que a quantidade de créditos do usuario, ele desconta automaticamente
        if (getUser()->credit > $newContract->plan->price) {

            Log::info('Valor do novo contrato é menor que o saldo de créditos do usuario.');

            Payment::create([
                'contract_id' => $newContract->id,
                'amount' => 0,
                'payment_method' => 'CREDIT_ACCOUNT',
                'status' => 'confirmed'                
            ]);
            Log::info('Pagamento efetuado com os créditos disponiveis');

            // Ativa o novo contrato
            $newContract->update([
                'active' => true,
                'nota' => 'Contrato ativo. Pagamento realizado com créditos que o usuario tinha disponivel.',
            ]);
            Log::info('Contrato ativado.');

            // Altera os créditos restantes do usuaio
            User::find(getUser()->id)->update([
                'credit' => getUser()->credit - $newContract->plan->price,
            ]);
            Log::info('Debitando do dos créditos do usuario o valor do plano');

            return response()->json([
                'message' => 'Plano alterado com sucesso. Como a quantidade de créditos que você tinha, era
                maior que o valor do plano atual escolhido, esse valor foi debitado automaticamente e ainda lhe restou:                
                ' . ($user->credit - $newContract->plan->price),
                'new_contract' => $newContract,
            ], 200);

        } else {
            // Redireciona para tela de pagamento, passando o id do contrato
            return response()->json([
                'message' => 'Plano alterado com sucesso. Aguardando pagamento.',
                'credit' => getUser()->credit,
                'new_contract' => $newContract,
            ], 200);
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
            ], 400);
        }

        return response()->json([
            'Nome: ' => User::find($active->user_id)->name,
            'Contrato ativo: ' => $active->plan->description,
            'Preço: ' => 'R$' . $active->plan->price,
        ], 200);
    }

}
