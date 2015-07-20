@extends('layouts.admin')

@section('title')
    <p class="center-text">Welkom {{ Auth::user()->name }} to the Admin Dash-Board</p>
@endsection

@section('content')
    <!-- Default panel contents -->
    <div class="panel-body">
        <!-- Table -->
        <table class="table">
            <label class="col-sm-2 control-label">Name</label>
            <div class="col-sm-10">
                <p>{{($user->name)}}</p>
            </div>

            <label class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <p>{{($user->email)}}</p>
            </div>

            <label for="title" class="col-sm-2 control-label">Role</label>
            <div class="col-sm-10">
                <p>{{($user->role)}}</p>
            </div>

            <label class="col-sm-2 control-label">Day Created</label>
            <div class="col-sm-10">
                <p>{{($user->created_at)}}</p>
            </div>

            <label  class="col-sm-2 control-label">Day Updated</label>
            <div class="col-sm-10">
                <p>{{($user->updated_at)}}</p>
            </div>
            <div class="col-sm-2 control-label col-sm-10">
                <a href="{{ url('admin-dashboard')}}" class="btn btn-primary">Back</a>
            </div>
        </table>
    </div>
@endsection