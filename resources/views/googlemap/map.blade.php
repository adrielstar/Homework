@extends('layouts.googleapi')

@section('panel')
     <div class="btn-group btn-group-justified" role="group" aria-label="...">
        <div class="btn-group">
            <button type="button" class="btn btn-sm btn-primary glyphicon glyphicon-flag">Route</button>
        </div>
        <div class="btn-group" role="group">
            <button id="btn" type="button" class="btn btn-success btn-sm  glyphicon glyphicon-home" onclick="changeBikeStoreVisibility()">Store</button>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-sm btn-primary glyphicon glyphicon-globe">Google Maps</button>
        </div>
        <div class="btn-group">
            <!-- Button HTML (to Trigger Modal) -->
            <button href="#myModal" type="button" data-toggle="modal" class="btn btn-sm btn-info glyphicon glyphicon-info-sign">Info</button>

            <!-- Modal HTML -->
            <div id="myModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Veiligstaling</h4>
                        </div>

                        <div class="modal-body">
                            <p>To get information about siclys store, your tracking location need to be on!</p>
                            <p class="text-warning"><small> For more information about Events go to the event page</small></p>
                            <div class="media">
                                <div class="media-left media-middle">
                                    <a href="#">
                                        <img class="media-object" src="{{URL::asset('images/bike.png')}}" alt="...">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">Bike Garage Location</h4>
                                </div>
                            </div>

                            <div class="media">
                                <div class="media-left media-middle">
                                    <a href="#">
                                        <img class="media-object" src="{{URL::asset('images/BikeLocationIcon.png')}}" alt="...">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">Your Location</h4>
                                </div>
                            </div>

                                <div class="media">
                                    <div class="media-left media-middle">
                                        <a href="#">
                                            <img class="media-object" src="{{URL::asset('images/BikeStoreIcon.png')}}" alt="...">
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="media-heading">Bike Store Location</h4>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('content-2')
    <div class="list-group">
        <a class="list-group-item active">
            <h4 class="list-group-item-heading center-text">panel</h4>
        </a>
        <div class="col-md-2 col-sm-12 panel" id="directionsPanel"></div>
    </div>
@endsection


@section('content')
    <div id="map-canvas"></div>
@endsection
