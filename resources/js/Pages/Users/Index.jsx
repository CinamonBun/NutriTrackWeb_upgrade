import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

export default function Index({ users }) {
    const { auth } = usePage().props;
    const currentUser = auth.user;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [resettingUser, setResettingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const { data: createData, setData: setCreateData, post: createPost, processing: createProcessing, errors: createErrors, reset: createReset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const { data: editData, setData: setEditData, put: editPut, processing: editProcessing, errors: editErrors, reset: editReset } = useForm({
        name: '',
        email: '',
        role: 'user',
    });

    const [editInitialData, setEditInitialData] = useState(null);
    const [editOtpStep, setEditOtpStep] = useState('idle'); // 'idle' | 'sent'
    const [editOtpCode, setEditOtpCode] = useState('');
    const [editOtpError, setEditOtpError] = useState('');
    const [isRequestingEditOtp, setIsRequestingEditOtp] = useState(false);
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const [resetStep, setResetStep] = useState('send'); // 'send' | 'confirm'
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetError, setResetError] = useState('');
    const [isResetting, setIsResetting] = useState(false);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createPost('/users', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createReset();
            }
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        const initial = { name: user.name, email: user.email, role: user.role };
        setEditInitialData(initial);
        setEditData(initial);
        setEditOtpStep('idle');
        setEditOtpCode('');
        setEditOtpError('');
        setIsEditModalOpen(true);
    };

    const handleEditClick = (user) => {
        openEditModal(user);
    };

    const isEditDirty = editInitialData
        ? editData.name !== editInitialData.name ||
        editData.email !== editInitialData.email ||
        editData.role !== editInitialData.role
        : false;

    const editNeedsOtp = editingUser ? editingUser.id !== currentUser.id : false;

    const requestEditVerification = async () => {
        if (!editingUser) return;
        if (!editNeedsOtp) return;
        setIsRequestingEditOtp(true);
        setEditOtpError('');
        try {
            await axios.post(`/users/${editingUser.id}/send-action-verification-code`, { action: 'edit' });
            setEditOtpStep('sent');
        } catch (error) {
            setEditOtpError(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to send verification code.'
            );
        } finally {
            setIsRequestingEditOtp(false);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (!editingUser) return;
        if (!isEditDirty) return;

        const doUpdate = async () => {
            setIsUpdatingUser(true);
            setEditOtpError('');
            try {
                await axios.put(`/users/${editingUser.id}`, editData);
                setIsEditModalOpen(false);
                setEditingUser(null);
                setEditInitialData(null);
                setEditOtpStep('idle');
                setEditOtpCode('');
                setEditOtpError('');

                // Force a clean reload of the page to show changes
                router.visit(window.location.pathname, {
                    preserveScroll: true,
                    only: ['users'],
                });
            } catch (error) {
                if (error?.response?.status === 403 && error?.response?.data?.requires_verification) {
                    setEditOtpError('Verification required. Please request a new code.');
                    setEditOtpStep('idle');
                } else if (error?.response?.status === 422) {
                    setEditOtpError(error?.response?.data?.message || 'Validation error.');
                } else {
                    setEditOtpError('An error occurred.');
                }
            } finally {
                setIsUpdatingUser(false);
            }
        };

        if (!editNeedsOtp) {
            doUpdate();
            return;
        }

        if (editOtpStep !== 'sent') {
            requestEditVerification();
            return;
        }

        setIsUpdatingUser(true);
        setEditOtpError('');
        axios.post(`/users/${editingUser.id}/verify-action-code`, { action: 'edit', code: editOtpCode })
            .then(() => doUpdate())
            .catch((error) => {
                setIsUpdatingUser(false);
                if (error?.response?.status === 422) {
                    setEditOtpError(error?.response?.data?.message || 'Invalid code');
                } else {
                    setEditOtpError(error?.response?.data?.message || error?.message || 'An error occurred.');
                }
            });
    };

    const handleDelete = (user) => {
        setDeletingUser(user);
        setDeleteConfirmText('');
        setDeletePassword('');
        setDeleteError('');
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        if (!deletingUser) return;
        setIsDeleting(true);
        setDeleteError('');
        try {
            await axios.delete(`/users/${deletingUser.id}`, { data: { password: deletePassword } });
            setIsDeleteModalOpen(false);
            setDeletingUser(null);
            setDeleteConfirmText('');
            setDeletePassword('');
            router.reload({ only: ['users'] });
        } catch (error) {
            if (error?.response?.status === 422) {
                setDeleteError(error?.response?.data?.message || 'Validation error.');
            } else if (error?.response?.status === 403) {
                setDeleteError('Unauthorized.');
            } else {
                setDeleteError('An error occurred.');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const handleResetPassword = (user) => {
        setResettingUser(user);
        setResetStep('send');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setResetError('');
        setIsResetPasswordModalOpen(true);
    };

    const handleSendResetCode = async () => {
        if (!resettingUser) return;
        setIsResetting(true);
        setResetError('');
        try {
            await axios.post(`/users/${resettingUser.id}/send-password-reset-code`);
            setResetStep('confirm');
        } catch (error) {
            setResetError(error?.response?.data?.message || 'Failed to send verification code.');
        } finally {
            setIsResetting(false);
        }
    };

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!resettingUser) return;
        setIsResetting(true);
        setResetError('');
        try {
            await axios.post(`/users/${resettingUser.id}/reset-password-with-code`, {
                code: resetCode,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            setIsResetPasswordModalOpen(false);
            setResettingUser(null);
            setResetStep('send');
            setResetCode('');
            setNewPassword('');
            setConfirmPassword('');
            setResetError('');
        } catch (error) {
            if (error?.response?.status === 422) {
                setResetError(error?.response?.data?.message || 'Validation error.');
            } else if (error?.response?.status === 403) {
                setResetError('Unauthorized.');
            } else {
                setResetError('An error occurred.');
            }
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Users Management" />
            <section className="pt-28 pb-12 md:pt-36 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Users Management</h1>
                            <p className="mt-2 text-lg opacity-60 dark:opacity-70">Manage user accounts and roles.</p>
                        </div>
                        <button onClick={() => setIsCreateModalOpen(true)} className="px-5 py-2.5 bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium rounded-xl transition-colors shadow-sm">
                            + Add User
                        </button>
                    </div>

                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl shadow-sm overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-[#cccccc] dark:border-[#404040]">
                                        <th className="px-6 py-4 font-semibold text-sm">Name</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Email</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Role</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#3dccc7]/20 text-[#3dccc7] flex items-center justify-center font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 opacity-80">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => handleResetPassword(user)} className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg transition-colors" title="Reset password with code">
                                                    Reset Pass
                                                </button>
                                                <button onClick={() => handleEditClick(user)} className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium bg-[#3dccc7]/10 text-[#3dccc7] hover:bg-[#3dccc7]/20 rounded-lg transition-colors">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(user)} disabled={user.id === currentUser.id} className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${user.id === currentUser.id ? 'opacity-50 cursor-not-allowed bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500' : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-[#cccccc] dark:border-[#404040]">
                        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Add New User</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                        </div>
                        <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" value={createData.name} onChange={e => setCreateData('name', e.target.value)} required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" value={createData.email} onChange={e => setCreateData('email', e.target.value)} required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input type="password" value={createData.password} onChange={e => setCreateData('password', e.target.value)} required minLength={8} className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <select value={createData.role} onChange={e => setCreateData('role', e.target.value)} className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all [&>option]:bg-white [&>option]:text-black dark:[&>option]:bg-[#2a2a2a] dark:[&>option]:text-white">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="pt-2 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">Cancel</button>
                                <button type="submit" disabled={createProcessing} className="px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50">Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-[#cccccc] dark:border-[#404040]">
                        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Edit User</h3>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingUser(null);
                                    setEditInitialData(null);
                                    setEditOtpStep('idle');
                                    setEditOtpCode('');
                                    setEditOtpError('');
                                }}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" value={editData.name} onChange={e => setEditData('name', e.target.value)} required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" value={editData.email} onChange={e => setEditData('email', e.target.value)} required className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <select value={editData.role} onChange={e => setEditData('role', e.target.value)} className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all [&>option]:bg-white [&>option]:text-black dark:[&>option]:bg-[#2a2a2a] dark:[&>option]:text-white">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {isEditDirty && editNeedsOtp && editOtpStep === 'sent' && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">OTP Code</label>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="000000"
                                        value={editOtpCode}
                                        onChange={(e) => setEditOtpCode(e.target.value)}
                                        required
                                        className="w-full text-center tracking-[0.5em] font-mono text-xl px-4 py-3 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                    />
                                    <p className="text-xs opacity-60 mt-2">
                                        A 6-digit code was sent to the <strong>target admin email</strong>. Please ask them for the code to proceed.
                                    </p>
                                </div>
                            )}
                            {editOtpError && <p className="text-red-500 text-sm">{editOtpError}</p>}
                            <div className="pt-2 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditingUser(null);
                                        setEditInitialData(null);
                                        setEditOtpStep('idle');
                                        setEditOtpCode('');
                                        setEditOtpError('');
                                    }}
                                    className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                {!isEditDirty ? (
                                    <button type="button" disabled className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium transition-colors cursor-not-allowed">
                                        No Changes
                                    </button>
                                ) : !editNeedsOtp ? (
                                    <button
                                        type="submit"
                                        disabled={isUpdatingUser || isRequestingEditOtp}
                                        className="px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50"
                                    >
                                        Update
                                    </button>
                                ) : editOtpStep !== 'sent' ? (
                                    <button
                                        type="button"
                                        onClick={requestEditVerification}
                                        disabled={isRequestingEditOtp || isUpdatingUser}
                                        className="px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50"
                                    >
                                        Request Verification
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isUpdatingUser || isRequestingEditOtp || editOtpCode.length !== 6}
                                        className="px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50"
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-[#cccccc] dark:border-[#404040]">
                        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-red-500">Delete User</h3>
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setDeletingUser(null);
                                    setDeleteConfirmText('');
                                    setDeletePassword('');
                                    setDeleteError('');
                                }}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleDeleteSubmit} className="p-6 space-y-4">
                            <p className="text-sm opacity-80">
                                This action will permanently delete <strong>{deletingUser?.name}</strong> ({deletingUser?.email}). This cannot be undone.
                            </p>
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-xl p-4 text-sm">
                                <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Double check</p>
                                <p className="opacity-80">Type <strong>Confirm</strong> to enable delete.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type "Confirm"</label>
                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    placeholder="Confirm"
                                    className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Your password</label>
                                <input
                                    type="password"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    placeholder="Enter your admin password"
                                    className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-xs opacity-60 mt-2">We require your password to confirm this action.</p>
                            </div>
                            {deleteError && <p className="text-red-500 text-sm">{deleteError}</p>}
                            <div className="pt-2 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isDeleting || deleteConfirmText !== 'Confirm' || !deletePassword}
                                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {isResetPasswordModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-[#cccccc] dark:border-[#404040]">
                        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Reset Password</h3>
                            <button
                                onClick={() => {
                                    setIsResetPasswordModalOpen(false);
                                    setResettingUser(null);
                                    setResetStep('send');
                                    setResetCode('');
                                    setNewPassword('');
                                    setConfirmPassword('');
                                    setResetError('');
                                }}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </button>
                        </div>

                        {resetStep === 'send' ? (
                            <div className="p-6 space-y-4">
                                <p className="text-sm opacity-80">
                                    This will send a 6-digit verification code to <strong>{resettingUser?.email}</strong>. Ask the user for the code, then set the new password here.
                                </p>
                                {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
                                <div className="pt-2 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsResetPasswordModalOpen(false)}
                                        className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSendResetCode}
                                        disabled={isResetting}
                                        className="px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50"
                                    >
                                        Send Code
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleResetPasswordSubmit} className="p-6 space-y-4">
                                <p className="text-sm opacity-80">
                                    Enter the 6-digit code sent to <strong>{resettingUser?.email}</strong>, then set the new password.
                                </p>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Verification Code</label>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="000000"
                                        value={resetCode}
                                        onChange={(e) => setResetCode(e.target.value)}
                                        required
                                        className="w-full text-center tracking-[0.5em] font-mono text-xl px-4 py-3 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="w-full px-4 py-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
                                <div className="pt-2 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setResetStep('send');
                                            setResetCode('');
                                            setNewPassword('');
                                            setConfirmPassword('');
                                            setResetError('');
                                        }}
                                        className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isResetting || resetCode.length !== 6 || newPassword.length < 8 || newPassword !== confirmPassword}
                                        className="px-4 py-2 rounded-xl bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium transition-colors disabled:opacity-50"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
