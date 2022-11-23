<?php

namespace Tests\Feature;



use App\Models\MenuGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class MenuGroupTest extends TestCase
{
    use RefreshDatabase;
    public function setUp(): void
    {
        parent::setUp();
        //acting as superadmin
        $this->actingAs(User::find(1));
    }

    public function test_admin_can_see_menu_group_page()
    {
        $this->actingAs(User::find(1));

        //open user page
        $response = $this->get('/menu-management/menu-group');

        //makesure the response is 200
        $response->assertStatus(200);

        $response->assertSeeText('dashboard');
    }

    public function test_admin_can_add_menu_group_data()
    {
        $response = $this->post(
            '/menu-management/menu-group',
            [
                "name" => "User Index",
                "icon" => "home",
                "permission_name" => "user.index",
            ]
        );
        //to makesure if there is no errors
        $response->assertSessionHasNoErrors();
        
        //makesure it's redirect to the correct path

        $response->assertRedirect("/menu-management/menu-group");
        //to makesure the success notification is appear

        $response->assertSessionHas("success", "Data berhasil ditambahkan");
        
        // check if name User Index appears on the table
        $search = $this->get("/menu-management/menu-group", [
            "name" => "User Index",
        ]);

        // makesure email is appeared 
        $search->assertSeeText("user.index");

        // check if it is located in the database
        $this->assertDatabaseHas('menu_groups', [
            "name" => "User Index",
            "icon" => "home",
            "permission_name" => "user.index",
        ]);
    }

    public function test_admin_can_see_edit_page()
    {
        $menu = MenuGroup::factory()->create();
        $response = $this->get('/menu-management/menu-group/' . $menu->id . '/edit');
        $response->assertStatus(200);
        $response->assertSeeText('Edit Menu Group');
        $response->assertSee($menu->name);
        $response->assertSeeText('Submit');
    }

    public function test_admin_can_update_menu_group_data()
    {
        MenuGroup::factory()->create();
        $menu = MenuGroup::first();
        $response = $this->put('/menu-management/menu-group/' . $menu->id, [
            "name" => "User Index",
        ]);
        $response->assertSessionHasNoErrors();
        $response->assertRedirect('/menu-management/menu-group/');
    }

    public function test_admin_can_delete_menu_group()
    {
        $menu = MenuGroup::factory()->create();
        $response = $this->delete('/menu-management/menu-group/' . $menu->id);
        $response->assertStatus(302);
    }
}