import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Index({ ingredients }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        calories_per_100g: '',
        protein: '',
        carbs: '',
        fat: '',
        image: null,
        _method: 'post'
    });

    const openModal = (ingredient = null) => {
        clearErrors();
        if (ingredient) {
            setEditingId(ingredient.id);
            setData({
                name: ingredient.name,
                calories_per_100g: ingredient.calories_per_100g,
                protein: ingredient.protein,
                carbs: ingredient.carbs,
                fat: ingredient.fat,
                image: null,
                _method: 'put'
            });
        } else {
            setEditingId(null);
            setData({
                name: '',
                calories_per_100g: '',
                protein: '',
                carbs: '',
                fat: '',
                image: null,
                _method: 'post'
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingId) {
            // Force POST request but Laravel will spoof to PUT because of _method: 'put' in data
            post(route('admin.ingredients.update', editingId), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.ingredients.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (ingredient) => {
        setItemToDelete(ingredient);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = () => {
        destroy(route('admin.ingredients.destroy', itemToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ingredients Management" />

            <div className="py-12 md:pt-36 min-h-[60vh]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
                        <h2 className="text-3xl font-bold tracking-tight">Ingredients</h2>
                        <button
                            onClick={() => openModal()}
                            className="bg-[#3dccc7] hover:bg-[#34b3ae] text-white px-4 py-2 rounded-lg shadow transition-colors"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    <div className="bg-white dark:bg-[#2a2a2a] shadow-sm sm:rounded-lg overflow-hidden border border-[#cccccc] dark:border-[#404040]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-black/20 border-b border-[#cccccc] dark:border-[#404040]">
                                        <th className="p-4 font-semibold text-sm">Name</th>
                                        <th className="p-4 font-semibold text-sm">Calories (100g)</th>
                                        <th className="p-4 font-semibold text-sm">Protein (g)</th>
                                        <th className="p-4 font-semibold text-sm">Carbs (g)</th>
                                        <th className="p-4 font-semibold text-sm">Fat (g)</th>
                                        <th className="p-4 font-semibold text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.map((item) => (
                                        <tr key={item.id} className="border-b border-[#cccccc] dark:border-[#404040] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            <td className="p-4 flex items-center gap-3">
                                                {item.image ? (
                                                    <img src={`/storage/${item.image}`} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                                                        {item.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                                <span className="font-medium">{item.name}</span>
                                            </td>
                                            <td className="p-4">{item.calories_per_100g} kcal</td>
                                            <td className="p-4">{item.protein}</td>
                                            <td className="p-4">{item.carbs}</td>
                                            <td className="p-4">{item.fat}</td>
                                            <td className="p-4 text-right space-x-3">
                                                <button onClick={() => openModal(item)} className="text-[#3dccc7] hover:underline text-sm font-medium">Edit</button>
                                                <button onClick={() => confirmDelete(item)} className="text-red-500 hover:underline text-sm font-medium">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {ingredients.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center opacity-60">No ingredients found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Ingredient' : 'Add New Ingredient'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="calories_per_100g" value="Calories per 100g (kcal)" />
                                <TextInput
                                    id="calories_per_100g"
                                    type="number"
                                    step="0.1"
                                    value={data.calories_per_100g}
                                    onChange={e => setData('calories_per_100g', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.calories_per_100g} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="protein" value="Protein (g)" />
                                <TextInput
                                    id="protein"
                                    type="number"
                                    step="0.1"
                                    value={data.protein}
                                    onChange={e => setData('protein', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.protein} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="carbs" value="Carbs (g)" />
                                <TextInput
                                    id="carbs"
                                    type="number"
                                    step="0.1"
                                    value={data.carbs}
                                    onChange={e => setData('carbs', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.carbs} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="fat" value="Fat (g)" />
                                <TextInput
                                    id="fat"
                                    type="number"
                                    step="0.1"
                                    value={data.fat}
                                    onChange={e => setData('fat', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.fat} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Image (Optional)" />
                            <input
                                type="file"
                                id="image"
                                onChange={e => setData('image', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-[#3dccc7]/10 file:text-[#3dccc7]
                                hover:file:bg-[#3dccc7]/20"
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <PrimaryButton disabled={processing} className="bg-[#3dccc7] hover:bg-[#34b3ae]">
                                {editingId ? 'Save Changes' : 'Add Ingredient'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="p-6 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete <span className="font-bold text-black dark:text-white">{itemToDelete?.name}</span>?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <DangerButton onClick={executeDelete} disabled={processing}>Yes, I'm sure</DangerButton>
                        <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>No, cancel</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
