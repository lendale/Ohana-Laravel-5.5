<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserPotentialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_potential', function (Blueprint $table) {
            $table->string('pid')->uniqid();
            $table->string('email')->unique();
            $table->string('clanId');
            $table->string('firstName',255);
            $table->string('middleName',255);
            $table->string('lastName',255);
            $table->string('gender',255);
            $table->string('livingStatus',255);
            $table->date('birthDate');
            $table->string('birthPlace',255);
            $table->string('photoURL',255);
            $table->boolean('merged');
            $table->string('relationship',255);
            $table->string('role',255);

            $table->foreign('clanId')->references('clanId')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_potential');
    }
}
