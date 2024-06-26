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

    public function index()
    {
        $documents = Document::select('documents.*', 'categories.name as category', 'sub_categories.name as subCategory', 'year_values.value as yearValue', 'year_types.name as type')
        ->join('sub_categories', 'documents.sub_category_id', '=', 'sub_categories.id')
        ->join('categories', 'sub_categories.category_id', '=', 'categories.id')
        ->join('year_values', 'documents.year_value_id', '=', 'year_values.id')
        ->join('year_types', 'year_values.year_type_id', '=', 'year_types.id')
        ->whereNull('deleted_at')
        ->orderByDesc('documents.created_at')
        ->get();

        return response()->json(['documents' => $documents, 'status' => 200]);
    }

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

    public function downloadAttachment($id)
    {
        // Find the document by ID
        $document = Document::findOrFail($id);

        // Get the file path from the 'attachment' column
        $filePath = $document->attachment;

        // Check if the file exists in storage
        if (!Storage::disk('public')->exists($filePath)) {
            abort(404, 'File not found');
        }

        // Generate response to download the file
        return response()->file(storage_path('app/public/' . $filePath));
    }

    public function update(Request $request, $id)
{
    // $request->validate([
    //     'doc_nos' => 'required',
    //     'doc_date' => 'required|date',
    //     'title' => 'required',
    //     'attachment' => 'required',
    //     'file' => 'nullable|file|max:2048|mimes:pdf,doc,docx,jpeg,jpg,png',
    //     'new_tag' => 'required|in:Y,N',
    //     'new_tag_day' => 'nullable|integer',
    // ]);

    try {
        $user = Auth::user();

        // Fetch the document to update
        $document = Document::findOrFail($id);

        // Fetch category, sub-category and year value names
        $subCategory = SubCategory::findOrFail($document->sub_category_id);
        $yearValue = YearValue::findOrFail($document->year_value_id);
        $category = Category::findOrFail($subCategory->category_id);

        // Update document details
        $document->updated_by = $user->id;
        $document->doc_nos = $request->doc_nos;
        $document->doc_date = $request->doc_date;
        $document->ref_nos = $request->ref_nos;
        $document->ref_date = $request->ref_date;
        $document->title = $request->title;
        $document->new_tag = $request->new_tag;
        $document->new_tag_day = $request->new_tag_day;

        // Handle file upload if a new file is provided
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();

            // Define folder structure based on category, sub-category, year value
            $filePath = 'uploads/' . $category->name . '/' . $subCategory->name . '/' . $yearValue->value . '/documents';
            
            // Store file in the defined folder structure
            $storedFilePath = $file->storeAs($filePath, $fileName, 'public');

            // Delete old file if exists
            // Storage::disk('public')->delete($document->attachment);

            // Update attachment field with new file path
            $document->attachment = $storedFilePath;
        }

        // Save updated document
        $document->save();

        return response()->json(['message' => 'Document updated successfully', 'status' => 200]);
    } catch (\Exception $e) {
        return response()->json(['message' => $e, 'messages' => $request, 'status' => 500]);
    }
}

public function destroy($id)
    {
        try {
            $document = Document::findOrFail($id);
            $document->delete();

            return response()->json(['message' => 'Document soft deleted successfully', 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to soft delete document', 'status' => 500]);
        }
    }

    public function restore($id)
    {
        try {
            $document = Document::withTrashed()->findOrFail($id);
            $document->restore();

            return response()->json(['message' => 'Document restored successfully', 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to restore document', 'status' => 500]);
        }
    }

}
