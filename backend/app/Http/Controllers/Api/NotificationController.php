<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of user notifications.
     */
    public function index(Request $request)
    {
        $notifications = $request->user()->notifications;

        return response()->json([
            'status' => 'success',
            'data' => $notifications
        ]);
    }

    /**
     * Mark all notifications of user as read.
     */
    public function markAllAsRead(Request $request)
    {
        $request->user()->notifications()->where('is_read', false)->update(['is_read' => true]);

        return response()->json([
            'status' => 'success',
            'message' => 'Semua notifikasi ditandai sebagai dibaca.'
        ]);
    }

    /**
     * Clear all notifications of user.
     */
    public function destroyAll(Request $request)
    {
        $request->user()->notifications()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Semua riwayat notifikasi dihapus.'
        ]);
    }
}
