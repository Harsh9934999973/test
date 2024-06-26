<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\YearValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required', // Adjust validation rules as per your form fields
            'yearValue' => 'required',
            'category' => 'required',
            'subCategory' => 'required',
            'doc_nos' => 'required',
            'doc_date' => 'required|date',
            'title' => 'required',
            'attachment' => 'required|file|max:2048|mimes:pdf,doc,docx,jpeg,jpg,png',
            'new_tag' => 'required|in:Y,N',
            'new_tag_day' => 'nullable|integer',
        ]);

        try {
            $user = Auth::user();

            // Fetch category, sub-category and year value names
            $category = Category::findOrFail($request->category);
            $subCategory = SubCategory::findOrFail($request->subCategory);
            $yearValue = YearValue::findOrFail($request->yearValue);

            $document = new Document();
            $document->user_id = $user->id;
            $document->year_value_id = $request->yearValue;
            $document->sub_category_id = $request->subCategory;
            $document->doc_nos = $request->doc_nos;
            $document->doc_date = $request->doc_date;
            $document->ref_nos = $request->ref_nos;
            $document->ref_date = $request->ref_date;
            $document->title = $request->title;
            $document->new_tag = $request->new_tag;
            $document->new_tag_day = $request->new_tag_day;

            // Handle file upload
            if ($request->hasFile('attachment')) {
                $file = $request->file('attachment');
                $fileName = time() . '_' . $file->getClientOriginalName();

                // Define folder structure based on category, sub-category, year value
                $filePath = 'uploads/' . $category->name . '/' . $subCategory->name . '/' . $yearValue->value . '/documents';
                
                // Store file in the defined folder structure
                $storedFilePath = $file->storeAs($filePath, $fileName, 'public');
                $document->attachment = $storedFilePath;
            }

            $document->save();

            return response()->json(['message' => 'Document uploaded successfully', 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to upload document', 'status' => 500]);
        }
    }
}
