<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Request;
use App\User;
use App\Posts;

class adminDashboardController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
    public function index()
    {
        //
        $users = User::all()->sortBy('name');;
        return view('admin.dash',compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('admin.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $user = Request::all();
        User::create($user);
        return redirect('admin-dashboard');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return view('admin.show',compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        return view('admin.edit',compact('user'));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $userUpdate=Request::all();
        $user = User::find($id);
        $user->update($userUpdate);
        return redirect('admin-dashboard');

    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect('admin-dashboard');
    }

}
