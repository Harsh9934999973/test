<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SubCategoryController extends Controller
{
    public function index()
    {
        $subCategories = SubCategory::select('sub_categories.*', 'categories.name as category_name')
    ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
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


        $subCategory = new SubCategory();
        $subCategory->category_id = $request->input('category_id');
        $subCategory->name = $request->input('name');
        $subCategory->hn_name = $request->input('hn_name');
        $subCategory->created_by = Auth::id(); 
        $subCategory->save();

        $category = Category::find($request->input('category_id'));
        if ($category) {
            $uploadsPath = public_path('uploads');
            $categoryFolder = $category->name;
    
            // Check if the directory doesn't already exist
            if (!file_exists($uploadsPath . '/' . $categoryFolder)) {
                // Create the directory with permissions (0755)
                mkdir($uploadsPath . '/' . $categoryFolder, 0755, true);
            }
    
            // Create sub-category folder
            $subCategoryFolder = $uploadsPath . '/' . $categoryFolder . '/' . $subCategory->name;
            if (!file_exists($subCategoryFolder)) {
                mkdir($subCategoryFolder, 0755, true);
            }
        }

        $subCategories = SubCategory::select('sub_categories.*', 'categories.name as category_name')
    ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
    ->orderBy('sub_categories.created_at', 'desc') // Order by created_at in descending order
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
