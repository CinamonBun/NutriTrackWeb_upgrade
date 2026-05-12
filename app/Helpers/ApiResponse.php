<?php

namespace App\Helpers;

class ApiResponse
{
    /**
     * Success response
     */
    public static function success(
        $data = null,
        string $message = null,
        int $statusCode = 200
    ) {
        $response = [
            'status' => 'success',
        ];

        if ($message) {
            $response['message'] = $message;
        }

        if (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Error response
     */
    public static function error(
        $errors = null,
        string $message = 'Error',
        int $statusCode = 400
    ) {
        $response = [
            'status' => 'error',
            'message' => $message,
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $statusCode);
    }
}
