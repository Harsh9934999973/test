<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\YearValue;

class YearValueController extends Controller
{
    public function index($year_type_id)
    {
        $yearValues = YearValue::with('yearType')
                        ->where('year_type_id', $year_type_id)
                        ->orderBy('created_at', 'desc') // Sort by created_at descending
                        ->get();

                        return response()->json(['years' => $yearValues, 'status' => 200], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year_type_id' => 'required|exists:year_types,id',
            'value' => 'required|string|max:255',
        ]);

        return YearValue::create($request->all());
    }

    public function show($id)
    {
        return YearValue::with('yearType')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'year_type_id' => 'required|exists:year_types,id',
            'value' => 'required|string|max:255',
        ]);

        $yearValue = YearValue::findOrFail($id);
        $yearValue->update($request->all());

        return $yearValue;
    }

    public function destroy($id)
    {
        $yearValue = YearValue::findOrFail($id);
        $yearValue->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
