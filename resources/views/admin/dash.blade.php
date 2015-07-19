@extends('app')

@section('title')
    Welkom {{ Auth::user()->name }} to the Admin Dash-Board
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
            <th>Actions</th>
            {{--<th>Create at</th>--}}
            {{--<th>Update at</th>--}}
        </tr>
        </thead>
        <tbody>
        @foreach($users as $user)
            <tr>
                <td>{{ $user->name}}</td>
                <td>{{ $user->role}}</td>
                <td>{{ $user->email}}</td>
                {{--<td>{{ $user->created_at->format('M d,Y \a\t h:i a')}}</td>--}}
                {{--<td>{{ $user->updated_at->format('M d,Y \a\t h:i a')}}</td>--}}
                <td><a href="{{url('admin-dashboard',$user->id)}}" class="btn btn-primary">Show</a> |
                <a href="{{route('admin-dashboard.edit',$user->id)}}" class="btn btn-warning">Update</a> |
                <a href="{{route('admin-dashboard.destroy',$user->id)}}" class="btn btn-danger">Delete</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection