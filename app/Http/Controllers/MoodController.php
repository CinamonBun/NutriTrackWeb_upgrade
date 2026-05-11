<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $moods = Mood::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $moods
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mood_level' => 'required|integer|min:1|max:5', // e.g. 1-5 scale
            'stress_level' => 'required|integer|min:1|max:5',
            'note' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $mood = Mood::create([
            'user_id' => $request->user()->id,
            'mood_level' => $request->mood_level,
            'stress_level' => $request->stress_level,
            'note' => $request->note
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Mood logged successfully',
            'data' => $mood
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $mood = Mood::where('user_id', $request->user()->id)->find($id);

        if (!$mood) {
            return response()->json(['status' => 'error', 'message' => 'Mood log not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $mood
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mood = Mood::where('user_id', $request->user()->id)->find($id);

        if (!$mood) {
            return response()->json(['status' => 'error', 'message' => 'Mood log not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'mood_level' => 'sometimes|integer|min:1|max:5',
            'stress_level' => 'sometimes|integer|min:1|max:5',
            'note' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $mood->update($request->only(['mood_level', 'stress_level', 'note']));

        return response()->json([
            'status' => 'success',
            'message' => 'Mood updated successfully',
            'data' => $mood
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $mood = Mood::where('user_id', $request->user()->id)->find($id);

        if (!$mood) {
            return response()->json(['status' => 'error', 'message' => 'Mood log not found'], 404);
        }

        $mood->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Mood deleted successfully'
        ], 204);
    }
}
