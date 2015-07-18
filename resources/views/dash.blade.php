@extends('app')

@section('title')
    <center>Welkom {{ Auth::user()->name }} to the Admin Dash-Board</center>
@endsection

@section('content')
    <h2>All User In System</h2>
    <p>You can not use this information outside this work</p>
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Create at</th>
            <th>Update at</th>
            <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        @foreach($persoons as $persoon)
            <tr>
                <td>{{ $persoon->name}}</td>
                <td>{{ $persoon->role}}</td>
                <td>{{ $persoon->email}}</td>
                <td>{{ $persoon->created_at->format('M d,Y \a\t h:i a')}}</td>
                <td>{{ $persoon->updated_at->format('M d,Y \a\t h:i a')}}</td>
                <td><a>{{ $persoon->id}}</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection