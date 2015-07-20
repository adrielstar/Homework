@extends('layouts.admin')

@section('title')
    Welkom {{ Auth::user()->name }} to the Admin Dash-Board
@endsection

@section('content')
    <h2>All User In System</h2>
    <p><a href="{{url('admin-dashboard/create')}}" class="btn btn-success">Create User</a></p>

    <table class="table table-bordered">
        <thead>
        <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
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
                <td>
                    <div class="dropdown">
                        <button class="btn btn-default label-info dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Action
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                            <li role="presentation"><a href="{{url('admin-dashboard',$user->id)}}" class="btn btn-primary">Show</a></li>
                            <li role="presentation"><a href="{{route('admin-dashboard.edit',$user->id)}}" class="btn btn-warning">Update</a></li>
                            <li role="presentation">{!! Form::open(['method' => 'DELETE', 'route'=>['admin-dashboard.destroy', $user->id]]) !!}
                                {!! Form::submit('Delete', ['class' => 'btn btn-del btn-danger']) !!}
                                {!! Form::close() !!}</li>
                        </ul>
                    </div>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection