<?php

namespace Tests\FeatureAdmin;

use App\Models\ProductCategory;

class AuthTest
{

    public function testUserComeOnSite()
    {
        // $user_id = md5(rand(0, 9999999).date('Ysmsd'));

        $categoriesWhithChilds = ProductCategory::pluck('parent_id')->toArray();
        $categoryRand = ProductCategory::whereNotIn('id', $categoriesWhithChilds)->inRandomOrder()->first();

        // SessionTest::set('user_id', $user_id);
        // setcookie('user_id', $user_id, time() + 10000000, '/');

        $this->call('GET', '/')->assertStatus(404);
        $this->call('GET', '/ro')->assertStatus(200);
        $this->call('GET', '/ro/catalog/'.$categoryRand->alias)->assertStatus(200);
    }
}