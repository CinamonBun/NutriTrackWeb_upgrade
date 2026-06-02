import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import CustomSelect from '@/Components/CustomSelect';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';

const GOUT_LEVEL_STYLES = {
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function GoutLevelBadge({ level }) {
    const key = level || 'low';
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    return (
        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full capitalize ${GOUT_LEVEL_STYLES[key] || GOUT_LEVEL_STYLES.low}`}>
            {label}
        </span>
    );
}

function resolveGoutLevel(levels) {
    if (levels.includes('high')) return 'high';
    if (levels.includes('medium')) return 'medium';
    return 'low';
}

function calculateNutritionFromRows(rows, ingredientMap) {
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbohydrate = 0;
    const goutLevels = [];

    for (const row of rows) {
        if (!row.ingredient_id || !row.quantity_gram) continue;

        const ing = ingredientMap[String(row.ingredient_id)];
        if (!ing) continue;

        const grams = parseFloat(row.quantity_gram);
        if (Number.isNaN(grams) || grams <= 0) continue;

        const factor = grams / 100;
        calories += (Number(ing.calories_per_100g) || 0) * factor;
        protein += (Number(ing.protein) || 0) * factor;
        fat += (Number(ing.fat) || 0) * factor;
        carbohydrate += (Number(ing.carbs) || 0) * factor;

        if (ing.gout_level) goutLevels.push(ing.gout_level);
    }

    return {
        calories: Math.round(calories * 10) / 10,
        protein: Math.round(protein * 10) / 10,
        fat: Math.round(fat * 10) / 10,
        carbohydrate: Math.round(carbohydrate * 10) / 10,
        gout_level: resolveGoutLevel(goutLevels),
    };
}

export default function Index({ recipes, filters, ingredientOptions }) {
    const ingredientSelectOptions = useMemo(
        () => (ingredientOptions ?? []).map((opt) => ({
            value: String(opt.id),
            label: opt.name,
        })),
        [ingredientOptions]
    );

    const ingredientNutritionMap = useMemo(() => {
        const map = {};
        (ingredientOptions ?? []).forEach((opt) => {
            map[String(opt.id)] = opt;
        });
        return map;
    }, [ingredientOptions]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        desc: '',
        is_favorite: false,
        image: null,
        ingredients: [{ ingredient_id: '', quantity_gram: '' }],
        _method: 'post',
    });

    const nutritionPreview = useMemo(
        () => calculateNutritionFromRows(data.ingredients, ingredientNutritionMap),
        [data.ingredients, ingredientNutritionMap]
    );

    const openModal = (recipe = null) => {
        clearErrors();

        if (recipe) {
            setEditingId(recipe.id);
            const existingIngredients = Array.isArray(recipe.ingredients)
                ? recipe.ingredients.map((ri) => ({
                    ingredient_id: String(ri.ingredient_id ?? ri.ingredient?.id ?? ''),
                    quantity_gram: ri.quantity_gram ?? '',
                }))
                : [{ ingredient_id: '', quantity_gram: '' }];

            setData({
                name: recipe.name ?? '',
                desc: recipe.desc ?? '',
                is_favorite: !!recipe.is_favorite,
                image: null,
                ingredients: existingIngredients.length ? existingIngredients : [{ ingredient_id: '', quantity_gram: '' }],
                _method: 'put',
            });
        } else {
            setEditingId(null);
            setData({
                name: '',
                desc: '',
                is_favorite: false,
                image: null,
                ingredients: [{ ingredient_id: '', quantity_gram: '' }],
                _method: 'post',
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
            post(route('admin.recipes.update', editingId), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        post(route('admin.recipes.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const addIngredientRow = () => {
        setData('ingredients', [...data.ingredients, { ingredient_id: '', quantity_gram: '' }]);
    };

    const removeIngredientRow = (index) => {
        const next = data.ingredients.filter((_, i) => i !== index);
        setData('ingredients', next.length ? next : [{ ingredient_id: '', quantity_gram: '' }]);
    };

    const updateIngredientRow = (index, key, value) => {
        const next = data.ingredients.map((row, i) => (i === index ? { ...row, [key]: value } : row));
        setData('ingredients', next);
    };

    const confirmDelete = (recipe) => {
        setItemToDelete(recipe);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = () => {
        destroy(route('admin.recipes.destroy', itemToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Recipes Management" />

            <section className="pt-28 pb-12 md:pt-36 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight opacity-90">Recipes</h1>
                            <p className="mt-2 text-lg opacity-60 dark:opacity-70">Manage recipes — nutrition is calculated from ingredient combinations.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full lg:w-auto">
                            <div className="w-full md:w-auto">
                                <SearchInput initialValue={filters?.search} routeName="admin.recipes.index" placeholder="Search recipes..." />
                            </div>
                            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => openModal()}
                                    className="px-4 sm:px-5 py-2.5 bg-[#3dccc7] hover:bg-[#68d8d6] text-white font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2 flex-1 sm:flex-none justify-center whitespace-nowrap"
                                >
                                    <span>+ Add</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl shadow-sm overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-[#cccccc] dark:border-[#404040]">
                                        <th className="px-6 py-4 font-semibold text-sm">Name</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Nutrition</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Gout</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Favorite</th>
                                        <th className="px-6 py-4 font-semibold text-sm">Description</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes.data.map((item) => (
                                        <tr key={item.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {item.image ? (
                                                        <img src={`/storage/${item.image}`} alt={item.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-[#3dccc7]/20 text-[#3dccc7] flex items-center justify-center text-xs font-bold">
                                                            {(item.name || '?').charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="font-medium">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 opacity-80 text-sm">
                                                {item.nutrition ? (
                                                    <div className="space-y-0.5">
                                                        <div className="font-medium">{item.nutrition.calories} kcal</div>
                                                        <div className="text-xs opacity-70">
                                                            P {item.nutrition.protein}g · C {item.nutrition.carbohydrate}g · F {item.nutrition.fat}g
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="opacity-50">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <GoutLevelBadge level={item.nutrition?.gout_level} />
                                            </td>
                                            <td className="px-6 py-4 opacity-80">
                                                {item.is_favorite ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        Yes
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                        No
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 opacity-80 max-w-[520px]">
                                                <div className="line-clamp-2">
                                                    {item.desc ? item.desc : <span className="opacity-50">No description</span>}
                                                </div>
                                            </td>
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
                                    {recipes.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center opacity-60">No recipes found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination links={recipes.links} />
                </div>
            </section>

            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold">{editingId ? 'Edit Recipe' : 'Add New Recipe'}</h3>
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

                    <div>
                        <InputLabel htmlFor="desc" value="Description (Optional)" className="text-black dark:text-white" />
                        <textarea
                            id="desc"
                            value={data.desc}
                            onChange={e => setData('desc', e.target.value)}
                            rows={4}
                            className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                            placeholder="e.g. High protein breakfast..."
                        />
                        <InputError message={errors.desc} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="is_favorite"
                            type="checkbox"
                            checked={!!data.is_favorite}
                            onChange={e => setData('is_favorite', e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-1 focus:ring-offset-0 focus:ring-primary bg-[#ffffff] dark:bg-[#404040] border border-[#cccccc] dark:border-[#404040] rounded"
                        />
                        <InputLabel htmlFor="is_favorite" value="Mark as favorite" className="text-black dark:text-white !mb-0" />
                        <InputError message={errors.is_favorite} className="mt-2" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between gap-3">
                            <InputLabel value="Ingredients" className="text-black dark:text-white" />
                            <button
                                type="button"
                                onClick={addIngredientRow}
                                className="px-3 py-1.5 text-xs font-medium bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg transition-colors"
                            >
                                + Add ingredient
                            </button>
                        </div>

                        <div className="mt-2 space-y-3">
                            {data.ingredients.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                                    <div className="sm:col-span-7 relative">
                                        <CustomSelect
                                            value={row.ingredient_id ? String(row.ingredient_id) : ''}
                                            onChange={(val) => updateIngredientRow(idx, 'ingredient_id', val)}
                                            options={ingredientSelectOptions}
                                            placeholder="Select ingredient"
                                            searchable
                                            searchPlaceholder="Search ingredient..."
                                            maxListHeight="max-h-72"
                                            emptyMessage="No ingredients found."
                                            className="w-full"
                                            dropdownClassName="w-full"
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <TextInput
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={row.quantity_gram}
                                            onChange={(e) => updateIngredientRow(idx, 'quantity_gram', e.target.value)}
                                            className="block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                            placeholder="grams"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2 flex sm:justify-end">
                                        <button
                                            type="button"
                                            onClick={() => removeIngredientRow(idx)}
                                            className="px-3 py-2 text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 rounded-lg transition-colors w-full sm:w-auto"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {errors?.[`ingredients.${idx}.ingredient_id`] && (
                                        <div className="sm:col-span-12">
                                            <InputError message={errors[`ingredients.${idx}.ingredient_id`]} />
                                        </div>
                                    )}
                                    {errors?.[`ingredients.${idx}.quantity_gram`] && (
                                        <div className="sm:col-span-12">
                                            <InputError message={errors[`ingredients.${idx}.quantity_gram`]} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <InputError message={errors.ingredients} className="mt-2" />
                    </div>

                    <div className="rounded-xl border border-[#cccccc] dark:border-[#404040] bg-neutral-50 dark:bg-neutral-800/50 p-4">
                        <p className="text-sm font-semibold mb-2">Nutrition preview (per recipe)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                            <div>
                                <span className="opacity-60 block text-xs">Calories</span>
                                <span className="font-medium">{nutritionPreview.calories} kcal</span>
                            </div>
                            <div>
                                <span className="opacity-60 block text-xs">Protein</span>
                                <span className="font-medium">{nutritionPreview.protein} g</span>
                            </div>
                            <div>
                                <span className="opacity-60 block text-xs">Carbs</span>
                                <span className="font-medium">{nutritionPreview.carbohydrate} g</span>
                            </div>
                            <div>
                                <span className="opacity-60 block text-xs">Fat</span>
                                <span className="font-medium">{nutritionPreview.fat} g</span>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs opacity-60">Gout level:</span>
                            <GoutLevelBadge level={nutritionPreview.gout_level} />
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
                            {editingId ? 'Save Changes' : 'Add Recipe'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Delete Recipe</h3>
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
        </AuthenticatedLayout>
    );
}

