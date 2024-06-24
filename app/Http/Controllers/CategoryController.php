<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{

    public function index()
    {
        // Fetch all categories
        $categories = Category::orderBy('created_at', 'desc')->get();

        // Return a JSON response with all categories
        return response()->json(['status' => 200, 'categories' => $categories],200);
    }


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
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

        $existingCategory = Category::where('name', $request->input('name'))->first();

    if ($existingCategory) {
        return response()->json([
            'status' => 400,
            'message' => 'Category already exists'
        ]);
    }

        $category = new Category();
        $category->name = $request->input('name');
        $category->hn_name = $request->input('hn_name');
        $category->created_by = Auth::id(); 
        $category->save();

        $uploadsPath = public_path('uploads');
    $categoryFolder = $category->name; // Use category name for folder name

    // Check if the directory doesn't already exist
    if (!file_exists($uploadsPath . '/' . $categoryFolder)) {
        // Create the directory
        mkdir($uploadsPath . '/' . $categoryFolder, 0755, true);
    }

        $categories = Category::orderBy('created_at', 'desc')->get();

        return response()->json(['categories' => $categories, 'status' => 200], 200);
    }

    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
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

        $existingCategory = Category::where('name', $request->input('name'))->first();

    if ($existingCategory) {
        return response()->json([
            'status' => 400,
            'message' => 'Category already exists'
        ]);
    }

        // Ensure 'created_by' cannot be updated
        $data = $request->only(['name', 'hn_name']);
        $data['updated_by'] = Auth::id(); // Assign the current user's ID as 'updated_by'

        // Update the category with the validated data
        $category->update($data);

        $categories = Category::orderBy('created_at', 'desc')->get();

        // Optionally, return a response indicating success
        return response()->json(['status' => 200, 'categories' => $categories],200);
    }
}
