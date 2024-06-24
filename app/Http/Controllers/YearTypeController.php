<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\YearType;

class YearTypeController extends Controller
{
    public function index()
    {
        $years = YearType::all();

        return response()->json(['years' => $years, 'status' => 200], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        return YearType::create($request->all());
    }

    public function show($id)
    {
        return YearType::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $yearType = YearType::findOrFail($id);
        $yearType->update($request->all());

        return $yearType;
    }

    public function destroy($id)
    {
        $yearType = YearType::findOrFail($id);
        $yearType->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
