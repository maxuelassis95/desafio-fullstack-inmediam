<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContractsController extends Controller
{
    
    public function show(string $id) {

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

        return response()->json($active, 200);
    }

}
