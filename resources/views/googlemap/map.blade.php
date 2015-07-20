@extends('layouts.googleapi')

@section('title')

@endsection

@section('content-2')
    <div class="list-group">
        <a class="list-group-item active">
            <h4 class="list-group-item-heading center-text">panel</h4>
        </a>
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Plan Route</h4>
        </a>
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Toon fietsverkopers</h4>
        </a>
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Huidige locatie</h4>
        </a>
    </div>
@endsection


@section('content')
    <div id="map-canvas"></div>
@endsection
