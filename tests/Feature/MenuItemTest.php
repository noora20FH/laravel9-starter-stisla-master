<?php

namespace Tests\Feature;

use App\Models\MenuItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class MenuItemTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;
    public function setUp(): void
    {
        parent::setUp();
        //acting as superadmin
        $this->actingAs(User::find(1));
    }


    public function createUser(){
        return Permission::factory()->create(['name' => 'menu-item.index']);
    }
    public function test_admin_can_see_menu_item_page()
    {
        $this->actingAs(User::find(1));

        //open user page
        $response = $this->get('/menu-management/menu-item');

        //makesure the response is 200
        $response->assertStatus(200);

        $response->assertSeeText('Parent');
        $response->assertSeeText('Name');
        $response->assertSeeText('Menu Item List');
        $response->assertSeeText('Permission');
        $response->assertSeeText('Action');
    }

    public function test_admin_can_add_menu_item()
    {
        $response = $this->post(
            '/menu-management/menu-item',
            [
                'name' => 'Permission List 1',
                'route' => 'role-and-permission/permission/1',
                'permission_name' => 'permission.index',
                'menu_group_id' => 3,
            ]
        );
        //to makesure if there is no errors
        $response->assertSessionHasNoErrors();
        
        //makesure it's redirect to the correct path

        $response->assertRedirect("/menu-management/menu-item");
        //to makesure the success notification is appear

        $response->assertSessionHas("success", "Data berhasil ditambahkan");
        
        // check if name Permission List appears on the table
        $search = $this->get("/menu-management/menu-item", [
            "name" => "Permission List 1",
        ]);

        // makesure permission name is appeared 
        $search->assertSeeText("permission.index");

        // check if it is located in the database
        $this->assertDatabaseHas('menu_items', [
            'name' => 'Permission List 1',
            'route' => 'role-and-permission/permission/1',
            'permission_name' => 'permission.index',
            'menu_group_id' => 3,
        ]);
    }




    
    public function test_admin_can_see_edit_page()
    {
        $menu = MenuItem::factory()->create();
        $response = $this->get('/menu-management/menu-item' . $menu->id . '/edit');
        $response->assertStatus(200);
        $response->assertSeeText('Edit Menu Item');
        $response->assertSee($menu->name);
        $response->assertSeeText('Submit');
    }

    public function test_admin_can_update_menu_item_data()
    {
        MenuItem::factory()->create();
        $menu = MenuItem::first();
        $response = $this->put('/menu-management/menu-item' . $menu->id, [
            "name" => "User Index",
        ]);
        $response->assertSessionHasNoErrors();
        $response->assertRedirect('/menu-management/menu-item');
    }

    public function test_delete_menu_item()
    {
        $menu = MenuItem::factory()->create();
        $response = $this->delete('/menu-management/menu-item' . $menu->id);
        $response->assertStatus(302);
    }



}