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
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const { data: importData, setData: setImportData, post: importPost, processing: importProcessing, errors: importErrors, reset: importReset } = useForm({
        file: null,
    });

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

    const handleExport = () => {
        window.location.href = route('admin.ingredients.export');
    };

    const handleImportSubmit = (e) => {
        e.preventDefault();
        importPost(route('admin.ingredients.import'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsImportModalOpen(false);
                importReset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ingredients Management" />

            <section className="pt-28 pb-12 md:pt-36 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight opacity-90">Ingredients</h1>
                            <p className="mt-2 text-lg opacity-60 dark:opacity-70">Manage your ingredients and track nutrition information.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleExport}
                                className="px-5 py-2.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Export
                            </button>
                            <button
                                onClick={() => setIsImportModalOpen(true)}
                                className="px-5 py-2.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Import
                            </button>
                            <button
                                onClick={() => openModal()}
                                className="px-5 py-2.5 bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2"
                            >
                                <span>+ Add Ingredient</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl shadow-sm overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-[#cccccc] dark:border-[#404040]">
                                        <th className="px-6 py-4 font-semibold text-sm">Name</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Calories (100g)</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Protein (g)</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Carbs (g)</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Fat (g)</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.map((item) => (
                                        <tr key={item.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {item.image ? (
                                                        <img src={`/storage/${item.image}`} alt={item.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-[#3dccc7]/20 text-[#3dccc7] flex items-center justify-center text-xs font-bold">
                                                            {item.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="font-medium">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 opacity-80">{item.calories_per_100g} kcal</td>
                                            <td className="px-6 py-4 opacity-80">{item.protein}</td>
                                            <td className="px-6 py-4 opacity-80">{item.carbs}</td>
                                            <td className="px-6 py-4 opacity-80">{item.fat}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => openModal(item)} className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium bg-[#3dccc7]/20 text-[#3dccc7] hover:bg-[#3dccc7]/30 rounded-lg transition-colors">
                                                    Edit
                                                </button>
                                                <button onClick={() => confirmDelete(item)} className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 rounded-lg transition-colors">
                                                    Delete
                                                </button>
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
            </section>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold">{editingId ? 'Edit Ingredient' : 'Add New Ingredient'}</h3>
                    <button onClick={closeModal} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-black dark:text-white" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="calories_per_100g" value="Calories per 100g (kcal)" className="text-black dark:text-white" />
                            <TextInput
                                id="calories_per_100g"
                                type="number"
                                step="0.1"
                                value={data.calories_per_100g}
                                onChange={e => setData('calories_per_100g', e.target.value)}
                                className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                required
                            />
                            <InputError message={errors.calories_per_100g} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="protein" value="Protein (g)" className="text-black dark:text-white" />
                            <TextInput
                                id="protein"
                                type="number"
                                step="0.1"
                                value={data.protein}
                                onChange={e => setData('protein', e.target.value)}
                                className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                required
                            />
                            <InputError message={errors.protein} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="carbs" value="Carbs (g)" className="text-black dark:text-white" />
                            <TextInput
                                id="carbs"
                                type="number"
                                step="0.1"
                                value={data.carbs}
                                onChange={e => setData('carbs', e.target.value)}
                                className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                required
                            />
                            <InputError message={errors.carbs} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="fat" value="Fat (g)" className="text-black dark:text-white" />
                            <TextInput
                                id="fat"
                                type="number"
                                step="0.1"
                                value={data.fat}
                                onChange={e => setData('fat', e.target.value)}
                                className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                required
                            />
                            <InputError message={errors.fat} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="image" value="Image (Optional)" className="text-black dark:text-white" />
                        <input
                            type="file"
                            id="image"
                            onChange={e => setData('image', e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-400 dark:text-gray-300
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-[#3dccc7]/15 file:text-[#3dccc7]
                                hover:file:bg-[#3dccc7]/20"
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingId ? 'Save Changes' : 'Add Ingredient'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Delete Ingredient</h3>
                    <button onClick={() => setIsDeleteModalOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <div className="p-12 text-center">
                    <svg className="mx-auto mb-4 text-neutral-500 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-300">
                        Are you sure you want to delete <span className="font-bold text-[#0e121a] dark:text-white">{itemToDelete?.name}</span>?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <DangerButton onClick={executeDelete} disabled={processing}>Yes, I'm sure</DangerButton>
                        <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>No, cancel</SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Import Modal */}
            <Modal show={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} maxWidth="md">
                <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Import Ingredients</h3>
                    <button onClick={() => setIsImportModalOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <form onSubmit={handleImportSubmit} className="p-6 space-y-4">
                    <p className="text-sm opacity-60">
                        Upload an Excel file (.xlsx, .xls) or CSV containing ingredient data.
                        Required columns: <strong>name, calories_per_100g, protein, carbs, fat</strong>.
                    </p>
                    <div>
                        <InputLabel htmlFor="import_file" value="Choose File" className="text-black dark:text-white" />
                        <input
                            type="file"
                            id="import_file"
                            onChange={e => setImportData('file', e.target.files[0])}
                            required
                            className="mt-1 block w-full text-sm text-gray-400 dark:text-gray-300
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#3dccc7]/15 file:text-[#3dccc7]
                            hover:file:bg-[#3dccc7]/20"
                        />
                        <InputError message={importErrors.file} className="mt-2" />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsImportModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={importProcessing}>
                            Import Data
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
