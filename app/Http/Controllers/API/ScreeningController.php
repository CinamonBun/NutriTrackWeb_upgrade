<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\ScreeningResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScreeningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $screenings = ScreeningResult::where(
            'user_id',
            $request->user()->id
        )
            ->orderBy('timestamp', 'desc')
            ->get();

        return ApiResponse::success(
            $screenings,
            'Screening results fetched successfully'
        );
    }

    public function latest(Request $request, string $screeningType)
    {
        $validator = Validator::make(
            ['screening_type' => $screeningType],
            [
                'screening_type' => 'required|string|in:gout,diabetes,heart',
            ]
        );

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 422);
        }

        $screening = ScreeningResult::where(
            'user_id',
            $request->user()->id
        )
            ->where('screening_type', $screeningType)
            ->orderBy('timestamp', 'desc')
            ->first();

        if (!$screening) {
            return ApiResponse::error(
                'Screening result not found',
                404
            );
        }

        return ApiResponse::success(
            $screening,
            'Latest screening result fetched successfully'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'screening_type' => 'required|string|in:gout,diabetes,heart',
            'level' => 'required|string',
            'total_score' => 'required|integer',
            'risk_factor_score' => 'required|integer',
            'symptom_score' => 'required|integer',
            'modifier_score' => 'required|integer',
            'answers' => 'required|array',
            'timestamp' => 'required|date',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 422);
        }

        $screening = ScreeningResult::create([
            'user_id' => $request->user()->id,
            'screening_type' => $request->screening_type,
            'level' => $request->level,
            'total_score' => $request->total_score,
            'risk_factor_score' => $request->risk_factor_score,
            'symptom_score' => $request->symptom_score,
            'modifier_score' => $request->modifier_score,
            'answers' => $request->answers,
            'timestamp' => $request->timestamp,
        ]);

        return ApiResponse::success($screening, 'Screening result saved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $screening = ScreeningResult::where(
            'user_id',
            $request->user()->id
        )
            ->find($id);

        if (!$screening) {
            return ApiResponse::error('Screening result not found', 404);
        }

        return ApiResponse::success($screening, 'Screening result fetched successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $screening = ScreeningResult::where(
            'user_id',
            $request->user()->id
        )
            ->find($id);

        if (!$screening) {
            return ApiResponse::error('Screening result not found', 404);
        }

        $validator = Validator::make($request->all(), [
            'screening_type' => 'sometimes|string|in:gout,diabetes,heart',
            'level' => 'sometimes|string',
            'total_score' => 'sometimes|integer',
            'risk_factor_score' => 'sometimes|integer',
            'symptom_score' => 'sometimes|integer',
            'modifier_score' => 'sometimes|integer',
            'answers' => 'sometimes|array',
            'timestamp' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 422);
        }

        $screening->update(
            $request->only([
                'screening_type',
                'level',
                'total_score',
                'risk_factor_score',
                'symptom_score',
                'modifier_score',
                'answers',
                'timestamp',
            ])
        );

        return ApiResponse::success($screening, 'Screening result updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $screening = ScreeningResult::where(
            'user_id',
            $request->user()->id
        )
            ->find($id);

        if (!$screening) {
            return ApiResponse::error('Screening result not found', 404);
        }

        $screening->delete();

        return ApiResponse::success(null, 'Screening result deleted successfully');
    }
}
