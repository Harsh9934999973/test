<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\YearValue;

class SubCategoryController extends Controller
{
    public function index()
    {
        $subCategories = SubCategory::select('sub_categories.*', 'categories.name as category_name', 'year_values.value')
    ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
    ->join('year_values', 'sub_categories.year_value_id', '=', 'year_values.id')
    ->orderBy('sub_categories.created_at', 'desc') // Order by created_at in descending order
    ->get();

        return response()->json(['sub_categories' => $subCategories, 'status' => 200], 200);
    }

    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'category_id' => 'required|exists:categories,id',
        'name' => 'required|string|max:255',
        'hn_name' => 'nullable|string|max:255',
        'year_value_id' => 'required|exists:year_values,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'errors' => $validator->errors(),
            'message' => 'Invalid inputs'
        ]);
    }

    $existingSubCategory = SubCategory::where('category_id', $request->input('category_id'))
        ->where('name', $request->input('name'))
        ->where('year_value_id', $request->input('year_value_id'))
        ->first();

    if ($existingSubCategory) {
        return response()->json([
            'status' => 400,
            'message' => 'Sub-category already exists for this category and year value'
        ]);
    }

    $subCategory = new SubCategory();
    $subCategory->category_id = $request->input('category_id');
    $subCategory->name = $request->input('name');
    $subCategory->hn_name = $request->input('hn_name');
    $subCategory->created_by = Auth::id();
    $subCategory->year_value_id = $request->input('year_value_id');
    $subCategory->save();

    $category = Category::find($request->input('category_id'));
    $yearValue = YearValue::find($request->input('year_value_id'));

    if ($category && $yearValue) {
        $uploadsPath = public_path('uploads');
        $categoryFolder = $category->name;

        // Create category folder if it doesn't exist
        $categoryPath = $uploadsPath . '/' . $categoryFolder;
        if (!file_exists($categoryPath)) {
            mkdir($categoryPath, 0755, true);
        }

        // Create subcategory folder
        $subCategoryFolder = $categoryPath . '/' . $subCategory->name;
        if (!file_exists($subCategoryFolder)) {
            mkdir($subCategoryFolder, 0755, true);
        }

        // Create year_value folder inside subcategory folder
        $yearValueFolder = $subCategoryFolder . '/' . $yearValue->value;
        if (!file_exists($yearValueFolder)) {
            mkdir($yearValueFolder, 0755, true);
        }
    }

    $subCategories = SubCategory::select('sub_categories.*', 'categories.name as category_name')
        ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
        ->orderBy('sub_categories.created_at', 'desc')
        ->get();

    return response()->json(['sub_categories' => $subCategories, 'status' => 200], 200);
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
            'name' => 'string|max:255',
            'hn_name' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => 'Invalid inputs'
            ]);
        }

        $existingSubCategory = SubCategory::where('category_id', $request->input('category_id'))
        ->where('name', $request->input('name'))
        ->first();

if ($existingSubCategory) {
return response()->json([
'status' => 400,
'message' => 'Sub-category already exists for this category'
]);
}


        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json(['status' => 404, 'message' => 'Sub category not found'], 404);
        }

        $subCategory->category_id = $subCategory->category_id;
        $subCategory->name = $request->input('name', $subCategory->name);
        $subCategory->hn_name = $request->input('hn_name', $subCategory->hn_name);
        $subCategory->created_by = $subCategory->created_by;
        $subCategory->updated_by = $subCategory->updated_by;
        $subCategory->save();

        $subCategories = SubCategory::select('sub_categories.*', 'categories.name as category_name')
    ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
    ->orderBy('sub_categories.created_at', 'desc') // Order by created_at in descending order
    ->get();

        return response()->json(['sub_categories' => $subCategories, 'status' => 200], 200);
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
