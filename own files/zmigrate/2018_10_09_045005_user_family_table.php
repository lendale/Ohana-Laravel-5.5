<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserFamilyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_family', function (Blueprint $table) {
            $table->integer('uid');
            $table->integer('pid');
            $table->integer('clanId');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('s');
            $table->date('bd');
            $table->string('img');
            $table->string('f');
            $table->string('m');
            $table->json('spouses');
            $table->json('maritalStatus');
            $table->string('loc');

            $table->foreign('uid')->references('uid')->on('users');
            $table->foreign('pid')->references('pid')->on('user_potential');
            $table->foreign('clanId')->references('clanId')->on('users');
            $table->foreign('firstName')->references('firstName')->on('users');
            $table->foreign('lastName')->references('lastName')->on('users');
            $table->foreign('s')->references('gender')->on('users');
            $table->foreign('bd')->references('birthDate')->on('users');
            $table->foreign('img')->references('photoURL')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_family');
    }
}
