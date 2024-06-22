<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubCategory;

class SubCategoryController extends Controller
{
    public function index()
    {
        $subCategories = SubCategory::all();
        return response()->json(['sub_categories' => $subCategories, 'status' => 200], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'hn_name' => 'nullable|string|max:255',
            'created_by' => 'required|exists:users,id',
            'updated_by' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => 'Invalid inputs'
            ]);
        }

        $subCategory = new SubCategory();
        $subCategory->category_id = $request->input('category_id');
        $subCategory->name = $request->input('name');
        $subCategory->hn_name = $request->input('hn_name');
        $subCategory->created_by = $request->input('created_by');
        $subCategory->updated_by = $request->input('updated_by');
        $subCategory->save();

        return response()->json(['sub_category' => $subCategory, 'status' => 200], 200);
    }

    public function show($id)
    {
        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json(['status' => 404, 'message' => 'Sub category not found'], 404);
        }

        return response()->json(['sub_category' => $subCategory, 'status' => 200], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'exists:categories,id',
            'name' => 'string|max:255',
            'hn_name' => 'nullable|string|max:255',
            'created_by' => 'exists:users,id',
            'updated_by' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => 'Invalid inputs'
            ]);
        }

        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json(['status' => 404, 'message' => 'Sub category not found'], 404);
        }

        $subCategory->category_id = $request->input('category_id', $subCategory->category_id);
        $subCategory->name = $request->input('name', $subCategory->name);
        $subCategory->hn_name = $request->input('hn_name', $subCategory->hn_name);
        $subCategory->created_by = $request->input('created_by', $subCategory->created_by);
        $subCategory->updated_by = $request->input('updated_by', $subCategory->updated_by);
        $subCategory->save();

        return response()->json(['sub_category' => $subCategory, 'status' => 200], 200);
    }

    public function destroy($id)
    {
        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json(['status' => 404, 'message' => 'Sub category not found'], 404);
        }

        $subCategory->delete();

        return response()->json(['status' => 200, 'message' => 'Sub category deleted successfully'], 200);
    }
}
