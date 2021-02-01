<?php

namespace App\Http\Controllers;

use App\Events;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $month = '7'; //Defaul July Month
        $year  = '2018'; //Default year 2018

        $events = Events::whereMonth('date', '=', $month)
                        ->whereYear('date', '=', $year)
                        ->where('isDeleted', '=', 0)->get();

        return $events->toJson();
    }

    public function save(Request $request)
    {
        
        $title = $request->input('title');
        $dates = explode(',', $request->input('dates'));
        $from  = date($request->input('dfrom'));
        $to    = date($request->input('dto'));
        $data  = array();
    
        foreach($dates as $d) :
            array_push($data, ['title' => $title, 'date' => $d]);
        endforeach;

        Events::where([
            ['date', '>=', $from],
            ['date', '<=', $to]
        ])->update(['isDeleted' => 1]);
        Events::insert($data);

        return response()->json('Successfully saved');
    }
}
