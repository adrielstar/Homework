@extends('layouts.admin')

@section('title')
    <p class="center-text">Welkom {{ Auth::user()->name }} to the Admin Dash-Board</p>
@endsection

@section('content')

    {!! Form::model($user,['method' => 'PATCH','route'=>['admin-dashboard.update',$user->id]]) !!}
    <div class="form-group">
        {!! Form::label('Role', 'Role:') !!}
        {!! Form::text('role',null,['class'=>'form-control']) !!}
    </div>
    <div class="form-group">
        {!! Form::submit('Update', ['class' => 'btn btn-primary']) !!}
        <a href="{{ url('admin-dashboard')}}" class="btn btn-primary">Back</a>
    </div>
    {!! Form::close() !!}
@endsection