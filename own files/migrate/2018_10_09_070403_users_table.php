<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('uid')->uniqid();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('clanId')->uniqid();
            $table->string('firstName',255);
            $table->string('middleName',255);
            $table->string('lastName',255);
            $table->string('gender',255);
            $table->string('livingStatus',255);
            $table->date('birthDate');
            $table->string('birthPlace',255);
            $table->string('photoURL',255);
            $table->string('barangay',255);
            $table->string('city',255);
            $table->integer('postal_code',10);
            $table->string('street_address',255);
            $table->boolean('merged');
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
