<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'hn_name' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => $validator->errors()
            ]);
        }

        // Create a new category instance
        $category = new Category();
        $category->name = $request->input('name');
        $category->hn_name = $request->input('hn_name');
        $category->created_by = Auth::id(); // Set the current authenticated user ID as the creator
        $category->save();

        // Optionally, you can return a response or redirect
        return response()->json(['message' => 'Category created successfully', 'status' => 200], 200);
    }
}
