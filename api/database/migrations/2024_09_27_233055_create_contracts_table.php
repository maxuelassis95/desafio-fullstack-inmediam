<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->on('users')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('plan_id');
            $table->foreign('plan_id')->on('plans')->references('id')->onDelete('cascade');

            $table->boolean('active')->default(false);
            $table->string('note')->default('Sem notas');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contracts');
    }
};
