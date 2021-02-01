@extends('layout.main')

@section('content')

<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <h3 class="card-header">Calendar</h5>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-4">
                            <form id="form_event">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="inp_event">Event</label>
                                            <input type="text" name="inp_event" id="inp_event" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="inp_from">From</label>
                                            <input type="text" name="inp_from" id="inp_from" class="form-control inp-datepicker" readonly>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="inp_to">To</label>
                                            <input type="text" name="inp_to" id="inp_to" class="form-control inp-datepicker" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-mon" name="cb-day" value="1">
                                                <label class="form-check-label" for="cb-mon">Mon</label>
                                              </div>
                                              <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-tue" name="cb-day" value="2">
                                                <label class="form-check-label" for="cb-tue">Tue</label>
                                              </div>
                                              <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-wed" name="cb-day" value="3">
                                                <label class="form-check-label" for="cb-wed">Wed</label>
                                              </div>
                                              <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-thu" name="cb-day" value="4">
                                                <label class="form-check-label" for="cb-thu">Thu</label>
                                              </div>
                                              <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-fri" name="cb-day" value="5">
                                                <label class="form-check-label" for="cb-fri">Fri</label>
                                              </div>
                                              <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-sat" name="cb-day" value="6">
                                                <label class="form-check-label" for="cb-sat">Sat</label>
                                              </div>
                                              <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="cb-sun" name="cb-day" value="0">
                                                <label class="form-check-label" for="cb-sun">Sun</label>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="text-left pb-4">
                                            <button id="btn-save-event" type="button" class="btn btn-primary" data-loading-text="Sending...">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-8">
                            <h3>Jul 2018</h3>
                            <div id="app_calendar">
                                <table class="table calendar-table">
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>

@endsection