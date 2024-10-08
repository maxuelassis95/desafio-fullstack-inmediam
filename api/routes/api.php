<?php

use App\Http\Controllers\ContractsController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json(['message' => 'ok']);
});

Route::apiResource('plans', PlanController::class, ['only' => 'index']);

Route::apiSingleton('user', UserController::class, ['only' => 'show']);

Route::group(['prefix' => 'contracts'], function() {
    Route::get('/active', [ContractsController::class, 'active'])->name('contracts.active');
    Route::get('/history/{id}', [ContractsController::class, 'history'])->name('contracts.history');
    Route::patch('/change-plan', [ContractsController::class, 'update'])->name('contracts-change');
    Route::apiResource('/', ContractsController::class);
});

Route::post('/payments', [PaymentsController::class, 'store'])->name('payments.store');