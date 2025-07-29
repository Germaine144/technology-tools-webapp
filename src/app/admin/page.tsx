"use client";
import React, { useState, useEffect, useCallback } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Search, Plus, Edit, Trash2, Settings, Users, BarChart3, Package, MessageSquare, HelpCircle, Shield, ChevronLeft, Upload, X, Eye } from 'lucide-react';
import api from '@/lib/axios';

// --- DATA TYPE INTERFACES ---
interface Product {
    id: number; name: string; category: string; price: number; products: number; views: number;
    status: string; image: string; description:string; sku: string; barcode: string;
    discount: number; tags: string[]; specifications?: string;
}
interface Category { id: number; name: string; slug: string; imageUrl?: string; description?: string; }
interface Notification { message: string; type: 'success' | 'error'; }
interface FormImageData { id: number; file: File; url: string; name: string; }
interface FormData {
    name: string; description: string; price: string; discount: string;
    category: string; tags: string[]; sku: string; barcode: string; quantity: string;
    images: FormImageData[]; brand: string; model: string; memory: string;
    screenType: string; protection: string; batteryCapacity: string;
    screenSize: string; specifications: string;
}
interface NewCategoryData { name: string; slug: string; imageUrl: string; description: string; id?: number; }

// Define proper error type
interface ApiError {
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
}

// --- COMPONENT PROPS INTERFACES ---
interface NotificationProps { notification: Notification | null; }
interface SidebarProps { 
    setCurrentView: (view: string) => void; 
    currentView: string;
    handleLogout: () => void;
}
interface CategoryManagerProps {
    existingCategories: Category[];
    newCategoryData: NewCategoryData;
    handleCategoryInputChange: (field: keyof NewCategoryData, value: string) => void;
    handleCategorySubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    categoryImagePreview: string;
    handleCategoryImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveCategoryImage: () => void;
    handleEditCategory: (category: Category) => void;
    handleDeleteCategory: (categoryId: number) => void;
}
interface ProductListProps {
    filteredProducts: Product[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleAddProduct: () => void;
    handleEditProduct: (product: Product) => void;
    handleDeleteProduct: (productId: number) => void;
    setViewProduct: (product: Product) => void;
}
interface ProductFormProps {
    selectedProduct: Product | null;
    formData: FormData;
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setCurrentView: (view: string) => void;
    handleInputChange: (field: keyof FormData, value: string) => void;
    handleTagToggle: (tag: string) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (imageId: number) => void;
    categories: Category[];
}

// --- CHILD COMPONENTS ---

const NotificationComponent = ({ notification }: NotificationProps) => {
    if (!notification) return null;
    return (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {notification.message}
        </div>
    );
};

const CategoryManager = React.memo(({
    existingCategories, newCategoryData, handleCategoryInputChange, handleCategorySubmit,
    categoryImagePreview, handleCategoryImageSelect, handleRemoveCategoryImage, handleEditCategory, handleDeleteCategory
}: CategoryManagerProps) => {
    useEffect(() => {
        if (document.activeElement?.id === 'category-name' && newCategoryData.name) {
            const generatedSlug = newCategoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            handleCategoryInputChange('slug', generatedSlug);
        }
    }, [newCategoryData.name, handleCategoryInputChange]);

    return (
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto"><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><div className="bg-white rounded-lg shadow-sm p-6"><h2 className="text-2xl font-semibold mb-6">Manage Categories</h2><form noValidate onSubmit={handleCategorySubmit} className="space-y-4">
                <div><label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">Category Name <span className="text-red-500">*</span></label><input id="category-name" name="name" type="text" required value={newCategoryData.name} onChange={(e) => handleCategoryInputChange('name', e.target.value)} placeholder="e.g. Smart Watches" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label htmlFor="category-slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) <span className="text-red-500">*</span></label><input id="category-slug" name="slug" type="text" required value={newCategoryData.slug} onChange={(e) => handleCategoryInputChange('slug', e.target.value)} placeholder="e.g. smart-watches" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Category Image (Optional)</label><div className="mt-1 space-y-4">
                    {categoryImagePreview && (<div className="relative w-32 h-32">
                        <Image src={categoryImagePreview} alt="Category Preview" width={128} height={128} className="w-full h-full object-cover rounded-lg" />
                        <button type="button" onClick={handleRemoveCategoryImage} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center" aria-label="Remove image"><X className="w-4 h-4" /></button>
                    </div>)}
                    <input type="file" id="category-image-upload" accept="image/*" onChange={handleCategoryImageSelect} className="hidden" /><label htmlFor="category-image-upload" className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-50 block"><Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /><span className="text-indigo-600 font-medium">Click to Upload an Image</span><p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p></label>
                </div></div>
                <div><label htmlFor="category-description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label><textarea id="category-description" name="description" value={newCategoryData.description} onChange={(e) => handleCategoryInputChange('description', e.target.value)} placeholder="Describe the category..." rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div className="flex justify-end pt-2"><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"><Plus className="w-4 h-4" /><span>{newCategoryData.id ? 'Update Category' : 'Add Category'}</span></button></div>
            </form></div></div><div className="lg:col-span-1"><div className="bg-white rounded-lg shadow-sm p-6"><h3 className="text-lg font-medium mb-4">Existing Categories</h3>
                {existingCategories.length > 0 ? (<ul className="space-y-2">{existingCategories.map(cat => (<li key={cat.id} className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md text-gray-800 text-sm">
                    <span>{cat.name}</span>
                    {cat.imageUrl && <Image src={cat.imageUrl} alt={cat.name} width={32} height={32} className="w-8 h-8 rounded object-cover" />}
                    <div className="flex space-x-2">
                        <button onClick={() => handleEditCategory(cat)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                </li>))}</ul>) : (<p className="text-sm text-gray-500">No categories found.</p>)}
            </div></div></div></div>
        </div>
    );
});
CategoryManager.displayName = 'CategoryManager';

const Sidebar = React.memo(({ setCurrentView, currentView, handleLogout }: SidebarProps) => {
    const linkClasses = (viewName: string) => `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${currentView === viewName ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`;
    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex-col hidden lg:flex">
            <div className="p-4 border-b border-gray-200"><div className="flex items-center space-x-2"><div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center"><span className="text-white font-bold text-sm">G</span></div><span className="font-semibold text-lg">Germaine</span></div></div>
            <nav className="flex-1 p-4 space-y-1"><div className="text-xs text-gray-500 uppercase tracking-wide mb-2">TOOLS</div><button onClick={() => setCurrentView('dashboard')} className={linkClasses('dashboard')}><BarChart3 className="w-4 h-4" /><span>Dashboard</span></button><button onClick={() => setCurrentView('orders')} className={linkClasses('orders')}><Package className="w-4 h-4" /><span>Orders</span></button><button onClick={() => setCurrentView('customers')} className={linkClasses('customers')}><Users className="w-4 h-4" /><span>Customers</span></button><button onClick={() => setCurrentView('messages')} className={linkClasses('messages')}><MessageSquare className="w-4 h-4" /><span>Messages</span></button><button onClick={() => setCurrentView('categories')} className={linkClasses('categories')}><Users className="w-4 h-4" /><span>Categories</span></button><button onClick={() => setCurrentView('products')} className={linkClasses('products')}><Package className="w-4 h-4" /><span>Products</span></button><button onClick={() => setCurrentView('integrations')} className={linkClasses('integrations')}><BarChart3 className="w-4 h-4" /><span>Integrations</span></button></nav>
            <div className="p-4 border-t border-gray-200 space-y-1">
                <button onClick={() => setCurrentView('settings')} className={linkClasses('settings')}><Settings className="w-4 h-4" /><span>Settings</span></button>
                <button onClick={() => setCurrentView('security')} className={linkClasses('security')}><Shield className="w-4 h-4" /><span>Security</span></button>
                <button onClick={() => setCurrentView('help')} className={linkClasses('help')}><HelpCircle className="w-4 h-4" /><span>Help</span></button>
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-semibold mt-4"><X className="w-4 h-4" /><span>Logout</span></button>
            </div>
        </div>
    );
});
Sidebar.displayName = 'Sidebar';

const ProductList = React.memo(({ filteredProducts, searchTerm, setSearchTerm, handleAddProduct, handleEditProduct, handleDeleteProduct, setViewProduct }: ProductListProps) => {
    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="bg-white p-6 border-b border-gray-200"><div className="flex items-center justify-between"><div className="flex items-center space-x-4"><div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input id="search-product" name="search-product" type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><div className="flex items-center space-x-2"><label htmlFor="category-filter" className="text-sm text-gray-600">Category</label><select id="category-filter" name="category-filter" className="border border-gray-300 rounded px-3 py-2 text-sm"><option>All Categories</option><option>Electronics</option><option>Attire</option><option>Home</option><option>Books</option></select></div></div><div className="flex items-center space-x-4"><span className="text-sm text-gray-600">{filteredProducts.length} products</span><button onClick={handleAddProduct} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center space-x-2 hover:bg-indigo-700"><Plus className="w-4 h-4" /><span>Add Product</span></button></div></div></div>
            <div className="p-6">{!filteredProducts.length ? (<div className="bg-white rounded-lg shadow-sm p-8 text-center"><Package className="w-16 h-16 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3><p className="text-gray-500 mb-4">{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}</p><button onClick={handleAddProduct} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center space-x-2 mx-auto"><Plus className="w-4 h-4" /><span>Add Product</span></button></div>) : (<div className="bg-white rounded-lg shadow-sm"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b border-gray-200">
    <tr>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Image</th>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Product Name</th>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Price</th>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Stock</th>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Views</th>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
        <th className="text-left p-4 text-sm font-medium text-gray-600">Actions</th>
    </tr>
</thead><tbody className="divide-y divide-gray-200">{filteredProducts.map((product) => (<tr key={product.id} className="hover:bg-gray-50"><td className="p-4">
                {product.image ? (
                    <Image src={product.image} alt={product.name} width={48} height={48} className="rounded object-cover w-12 h-12" />
                ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">N/A</div>
                )}
            </td><td className="p-4"><div className="flex items-center space-x-3"><div><div className="font-medium text-gray-900">{product.name}</div><div className="text-sm text-gray-500">{product.category}</div></div></div></td><td className="p-4"><div className="text-gray-900 font-medium">${product.price.toFixed(2)}</div>{product.discount > 0 && (<div className="text-sm text-green-600">-{product.discount}%</div>)}</td><td className="p-4 text-gray-900">{product.products}</td><td className="p-4 text-gray-900">{product.views.toLocaleString()}</td><td className="p-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>● {product.status}</span></td><td className="p-4"><div className="flex items-center space-x-2"><button onClick={() => setViewProduct(product)} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="View Details"><Eye className="w-4 h-4" /></button><button onClick={() => handleEditProduct(product)} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 flex items-center space-x-1"><Edit className="w-3 h-3" /><span>Edit</span></button><button onClick={() => handleDeleteProduct(product.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button></div></td></tr>))}</tbody></table></div></div>)}</div>
        </div>
    );
});
ProductList.displayName = 'ProductList';

const ProductForm = React.memo(({
    selectedProduct, formData, handleFormSubmit, setCurrentView,
    handleInputChange, handleTagToggle, handleImageUpload, removeImage, categories
}: ProductFormProps) => {
    return (
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">{selectedProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <button onClick={() => setCurrentView('products')} className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-4 h-4" /><span>Back to Products</span></button>
                    </div>
                    <form noValidate onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-6">
                                <div><h3 className="text-lg font-medium mb-4">General Information</h3><div className="space-y-4"><div><label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label><input id="product-name" name="name" type="text" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Enter product name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><div><label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea id="product-description" name="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Describe the product..." rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div></div></div>
                                <div><h3 className="text-lg font-medium mb-4">Specifications</h3><div className="space-y-4"><div><label htmlFor="product-specifications" className="block text-sm font-medium text-gray-700 mb-1">More Specs (key:value per line)</label><textarea id="product-specifications" name="specifications" value={formData.specifications} onChange={e => handleInputChange('specifications', e.target.value)} placeholder={"e.g.\nRAM: 8GB\nCPU: Snapdragon 8 Gen 2"} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div></div></div>
                            </div>
                            <div className="space-y-6">
                                <div><h3 className="text-lg font-medium mb-4">Product Images</h3><div className="space-y-4">{formData.images.length > 0 && (<div className="grid grid-cols-3 gap-2">{formData.images.map((image) => (<div key={image.id} className="relative">
                                    <Image src={image.url} alt={image.name} width={80} height={80} className="w-full h-20 object-cover rounded-lg" />
                                    <button type="button" onClick={() => removeImage(image.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center" aria-label={`Remove ${image.name}`}><X className="w-4 h-4" /></button>
                                </div>))}</div>)}<div><input type="file" id="images" name="images" multiple accept="image/*" onChange={handleImageUpload} className="hidden" /><label htmlFor="images" className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-50 block"><Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" /><span className="text-indigo-600 font-medium">Click to Upload Images</span><p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p></label></div></div></div>
                                <div><h3 className="text-lg font-medium mb-4">Organization</h3><div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label><div className="flex flex-wrap gap-2">{categories.map(cat => (<button key={cat.slug} type="button" className={`px-4 py-2 rounded-lg border transition-colors duration-150 ${formData.category === cat.slug ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} onClick={() => handleInputChange('category', cat.slug)}>{cat.name}</button>))}</div></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Product Tags</label><div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg">{['New Arrival', 'Best Seller', 'Featured', 'On Sale', 'Clearance'].map((tag) => (<label key={tag} htmlFor={`tag-${tag}`} className="flex items-center space-x-2 cursor-pointer"><input id={`tag-${tag}`} name="tags" type="checkbox" checked={formData.tags.includes(tag)} onChange={() => handleTagToggle(tag)} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" /><span className="text-sm text-gray-700">{tag}</span></label>))}</div></div></div></div>
                                <div><h3 className="text-lg font-medium mb-4">Pricing & Inventory</h3><div className="space-y-4"><div><label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-1">Price <span className="text-red-500">*</span></label><div className="relative"><span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span><input id="product-price" name="price" type="number" required min="0" step="0.01" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} placeholder="0.00" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div></div><div className="grid grid-cols-2 gap-4"><div><label htmlFor="product-discount" className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label><input id="product-discount" name="discount" type="number" min="0" max="100" value={formData.discount} onChange={(e) => handleInputChange('discount', e.target.value)} placeholder="e.g. 15" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><div><label htmlFor="product-quantity" className="block text-sm font-medium text-gray-700 mb-1">Stock</label><input id="product-quantity" name="quantity" type="number" min="0" value={formData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div></div><div className="grid grid-cols-2 gap-4"><div><label htmlFor="product-sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label><input id="product-sku" name="sku" type="text" value={formData.sku} onChange={(e) => handleInputChange('sku', e.target.value)} placeholder="SKU123" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><div><label htmlFor="product-barcode" className="block text-sm font-medium text-gray-700 mb-1">Barcode</label><input id="product-barcode" name="barcode" type="text" value={formData.barcode} onChange={(e) => handleInputChange('barcode', e.target.value)} placeholder="123456789" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div></div></div></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-6"><button type="button" onClick={() => setCurrentView('products')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{selectedProduct ? 'Update Product' : 'Add Product'}</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
});
ProductForm.displayName = 'ProductForm';

// --- MAIN PARENT COMPONENT ---
const ProductManager = () => {
    // --- MOCK MODE FLAG ---
    const mockMode = useState(true)[0]; // Remove unused setter
    const [currentView, setCurrentView] = useState('products');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<FormData>({ name: '', description: '', price: '', discount: '', category: '', tags: [], sku: '', barcode: '', quantity: '', images: [], brand: '', model: '', memory: '', screenType: '', protection: '', batteryCapacity: '', screenSize: '', specifications: '' });
    const [newCategoryData, setNewCategoryData] = useState<NewCategoryData>({ name: '', slug: '', imageUrl: '', description: '' });
    const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
    const [categoryImagePreview, setCategoryImagePreview] = useState<string>('');
    const [viewProduct, setViewProduct] = useState<Product | null>(null);
    const router = useRouter();

    const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    }, []);

    const handleApiError = useCallback((error: ApiError, context: string) => {
        console.error(`Error during ${context}:`, error);
        if (error.response?.status === 401) {
            showNotification('Authentication error. Please log in again.', 'error');
        } else {
            const message = error.response?.data?.message || `Failed to ${context}. Please try again.`;
            showNotification(message, 'error');
        }
    }, [showNotification]);

    // --- MOCK DATA (optional: can start with some sample data) ---
    const mockCategories: Category[] = [
        { id: 1, name: 'Phones', slug: 'phones', imageUrl: 'https://via.placeholder.com/32', description: 'Mobile phones' },
        { id: 2, name: 'Computers', slug: 'computers', imageUrl: 'https://via.placeholder.com/32', description: 'Computers' },
    ];
    const mockProducts: Product[] = [
        { id: 1, name: 'iPhone 14', category: 'phones', price: 999, products: 10, views: 100, status: 'active', image: 'https://via.placeholder.com/48', description: 'Latest iPhone', sku: 'IPH-14', barcode: '1234567890', discount: 10, tags: ['New Arrival', 'Best Seller'], specifications: 'RAM: 8GB\nCPU: A15 Bionic' },
    ];
    // ---
    // Use local state for mock data
    const [mockCategoriesState, setMockCategoriesState] = useState<Category[]>(mockCategories);
    const [mockProductsState, setMockProductsState] = useState<Product[]>(mockProducts);

    // --- LOCAL STORAGE PERSISTENCE FOR MOCK DATA ---
    // FIX: Load from localStorage on mount, with error handling for JSON.parse
    useEffect(() => {
        if (mockMode) {
            // Load products safely
            try {
                const storedProducts = localStorage.getItem('mockProducts');
                if (storedProducts) {
                    setMockProductsState(JSON.parse(storedProducts));
                } else {
                    setMockProductsState(mockProducts); // Seed with initial data if nothing is stored
                }
            } catch (error) {
                console.error("Failed to parse mock products from localStorage:", error);
                localStorage.removeItem('mockProducts'); // Clear corrupted data
                setMockProductsState(mockProducts); // Fallback to default mock data
            }

            // Load categories safely
            try {
                const storedCategories = localStorage.getItem('mockCategories');
                if (storedCategories) {
                    setMockCategoriesState(JSON.parse(storedCategories));
                } else {
                    setMockCategoriesState(mockCategories); // Seed with initial data
                }
            } catch (error) {
                console.error("Failed to parse mock categories from localStorage:", error);
                localStorage.removeItem('mockCategories'); // Clear corrupted data
                setMockCategoriesState(mockCategories); // Fallback to default mock data
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mockMode]); // This effect correctly runs only when mockMode changes.

    // Save to localStorage on change
    useEffect(() => {
        if (mockMode) {
            localStorage.setItem('mockProducts', JSON.stringify(mockProductsState));
            localStorage.setItem('mockCategories', JSON.stringify(mockCategoriesState));
        }
    }, [mockProductsState, mockCategoriesState, mockMode]);

    // --- FETCH DATA ---
    const fetchProductsAndCategories = useCallback(async () => {
        if (mockMode) {
            setProducts(mockProductsState);
            setCategories(mockCategoriesState);
        } else {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories')
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (error) {
                handleApiError(error as ApiError, 'fetch initial data');
            }
        }
    }, [mockMode, mockProductsState, mockCategoriesState, handleApiError]);

    useEffect(() => {
        fetchProductsAndCategories();
    }, [fetchProductsAndCategories]);

    const resetForm = useCallback(() => setFormData({ name: '', description: '', price: '', discount: '', category: '', tags: [], sku: '', barcode: '', quantity: '', images: [], brand: '', model: '', memory: '', screenType: '', protection: '', batteryCapacity: '', screenSize: '', specifications: '' }), []);
    const handleAddProduct = useCallback(() => { setSelectedProduct(null); resetForm(); setCurrentView('form'); }, [resetForm]);
    const handleEditProduct = useCallback((product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            discount: product.discount?.toString() || '',
            category: categories.find(c => c.name === product.category)?.slug || '',
            tags: product.tags || [],
            sku: product.sku || '',
            barcode: product.barcode || '',
            quantity: product.products?.toString() || '',
            images: product.image ? [{ id: 1, file: new File([], ''), url: product.image, name: 'existing-image' }] : [],
            brand: '',
            model: '',
            memory: '',
            screenType: '',
            protection: '',
            batteryCapacity: '',
            screenSize: '',
            specifications: product.specifications || ''
        });
        setCurrentView('form');
    }, [categories]);

    const handleDeleteProduct = useCallback(async (productId: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            if (mockMode) {
                setMockProductsState(prev => prev.filter(p => p.id !== productId));
                showNotification('Product deleted! (mock)', 'success');
            } else {
                try {
                    await api.delete(`/products/${productId}`);
                    showNotification('Product deleted successfully', 'success');
                    await fetchProductsAndCategories();
                } catch (error) {
                    handleApiError(error as ApiError, 'delete product');
                }
            }
        }
    }, [fetchProductsAndCategories, handleApiError, showNotification, mockMode]);

    const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedCategory = categories.find(cat => cat.slug === formData.category);
        if (!formData.name || !formData.price || !selectedCategory) {
            showNotification('Name, price, and category are required.', 'error');
            return;
        }
        if (mockMode) {
            const imageUrl = formData.images && formData.images.length > 0 ? formData.images[0].url : '';
            const newProductData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: selectedCategory.name,
                discount: formData.discount ? parseFloat(formData.discount) : 0,
                products: formData.quantity ? parseInt(formData.quantity, 10) : 0,
                image: imageUrl,
                tags: formData.tags,
                sku: formData.sku,
                barcode: formData.barcode,
                specifications: formData.specifications,
                status: 'active',
                views: selectedProduct ? selectedProduct.views : 0,
            };
            
            if (selectedProduct) {
                setMockProductsState((prev: Product[]) => prev.map(p => p.id === selectedProduct.id ? { ...p, ...newProductData } : p));
                showNotification('Product updated! (mock)', 'success');
            } else {
                setMockProductsState((prev: Product[]) => [
                    ...prev,
                    { ...newProductData, id: Date.now() }
                ]);
                showNotification('Product added! (mock)', 'success');
            }
            setCurrentView('products');
        } else {
            const payload = {
                name: formData.name, description: formData.description, price: parseFloat(formData.price),
                discountPrice: formData.discount ? parseFloat(formData.discount) : null,
                stockQuantity: formData.quantity ? parseInt(formData.quantity, 10) : 0,
                categoryId: selectedCategory.id, brand: formData.brand, model: formData.model, memory: formData.memory,
                screenType: formData.screenType, protection: formData.protection, batteryCapacity: formData.batteryCapacity,
                screenSize: formData.screenSize, specifications: formData.specifications, tags: formData.tags,
                sku: formData.sku, barcode: formData.barcode,
            };
            try {
                if (selectedProduct) {
                    await api.put(`/products/${selectedProduct.id}`, payload);
                    showNotification('Product updated!', 'success');
                } else {
                    await api.post('/products', payload);
                    showNotification('Product added!', 'success');
                }
                setCurrentView('products');
                await fetchProductsAndCategories();
            } catch (error) {
                handleApiError(error as ApiError, 'save product');
            }
        }
    }, [formData, categories, selectedProduct, fetchProductsAndCategories, handleApiError, showNotification, mockMode, setMockProductsState]);

    const handleEditCategory = useCallback((category: Category) => {
        setNewCategoryData({
            name: category.name,
            slug: category.slug,
            imageUrl: category.imageUrl ?? '',
            description: category.description ?? '',
            id: category.id,
        });
        setCategoryImagePreview(category.imageUrl ?? '');
        document.getElementById('category-name')?.focus();
    }, []);

    const handleDeleteCategory = useCallback((categoryId: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            if (mockMode) {
                setMockCategoriesState((prev: Category[]) => prev.filter(c => c.id !== categoryId));
                showNotification('Category deleted! (mock)', 'success');
            } else {
                 // You would add your API call here for non-mock mode
                 console.log("Deleting category " + categoryId);
            }
        }
    }, [mockMode, showNotification]);

    const handleCategorySubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newCategoryData.name.trim() || !newCategoryData.slug.trim()) {
            return showNotification('Category Name and Slug are required.', 'error');
        }
        const dataToSave = {
            ...newCategoryData,
            imageUrl: categoryImagePreview
        };

        if (mockMode) {
            if (dataToSave.id) {
                setMockCategoriesState((prev: Category[]) => prev.map(c => c.id === dataToSave.id ? { ...c, ...dataToSave } : c));
                showNotification('Category updated! (mock)', 'success');
            } else {
                setMockCategoriesState((prev: Category[]) => [...prev, { ...dataToSave, id: Date.now() }]);
                showNotification('Category added! (mock)', 'success');
            }
            setNewCategoryData({ name: '', slug: '', imageUrl: '', description: '' });
            setCategoryImageFile(null);
            setCategoryImagePreview('');
        } else {
            try {
                let finalImageUrl = newCategoryData.imageUrl;
                if (categoryImageFile) {
                    const uploadFormData = new FormData();
                    uploadFormData.append('image', categoryImageFile);
                    const uploadResponse = await api.post('/uploads/image', uploadFormData);
                    finalImageUrl = uploadResponse.data?.url;
                }
                const categoryPayload = {
                    name: newCategoryData.name,
                    slug: newCategoryData.slug,
                    description: newCategoryData.description || "",
                    imageUrl: finalImageUrl,
                };
                if (newCategoryData.id) {
                     await api.put(`/categories/${newCategoryData.id}`, categoryPayload);
                     showNotification('Category updated successfully!', 'success');
                } else {
                    await api.post('/categories', categoryPayload);
                    showNotification('Category added successfully!', 'success');
                }
                setNewCategoryData({ name: '', slug: '', imageUrl: '', description: '' });
                setCategoryImageFile(null);
                setCategoryImagePreview('');
                await fetchProductsAndCategories();
            } catch (error) {
                handleApiError(error as ApiError, 'save category');
            }
        }
    }, [newCategoryData, categoryImageFile, fetchProductsAndCategories, handleApiError, showNotification, mockMode, categoryImagePreview]);

    const handleInputChange = useCallback((field: keyof FormData, value: string) => setFormData(prev => ({ ...prev, [field]: value })), []);
    const handleTagToggle = useCallback((tag: string) => setFormData(prev => ({ ...prev, tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag] })), []);
    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newImages = Array.from(e.target.files).map(file => ({ id: Date.now() + Math.random(), file, url: URL.createObjectURL(file), name: file.name }));
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }, []);
    const removeImage = useCallback((imageId: number) => setFormData(prev => ({ ...prev, images: prev.images.filter(img => img.id !== imageId) })), []);
    const handleCategoryInputChange = useCallback((field: keyof NewCategoryData, value: string) => setNewCategoryData(prev => ({ ...prev, [field]: value })), []);
    const handleCategoryImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCategoryImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setCategoryImagePreview(previewUrl);
        }
    }, []);
    const handleRemoveCategoryImage = useCallback(() => {
        setCategoryImageFile(null);
        if (categoryImagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(categoryImagePreview);
        }
        setCategoryImagePreview('');
    }, [categoryImagePreview]);

    // --- LOGOUT HANDLER ---
    const handleLogout = async () => {
        if (mockMode) {
             showNotification('Logged out successfully! (mock)', 'success');
             console.log("Mock logout successful");
             return;
        }
        try {
            // Uncomment this line if you have a real API endpoint
            // await api.post('/auth/logout'); 
            showNotification('Logged out successfully!', 'success');
            setTimeout(() => {
                router.push('/login');
            }, 1500); 
        } catch (error) {
            handleApiError(error as ApiError, 'logout');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderCurrentView = () => {
        switch (currentView) {
            case 'products':
                return <ProductList {...{ filteredProducts, searchTerm, setSearchTerm, handleAddProduct, handleEditProduct, handleDeleteProduct, setViewProduct }} />;
            case 'form':
                return <ProductForm {...{ selectedProduct, formData, setCurrentView, handleFormSubmit, handleInputChange, handleTagToggle, handleImageUpload, removeImage, categories }} />;
            case 'categories':
                return <CategoryManager {...{ existingCategories: categories, newCategoryData, handleCategoryInputChange, handleCategorySubmit, categoryImagePreview, handleCategoryImageSelect, handleRemoveCategoryImage, handleEditCategory, handleDeleteCategory }} />;
            default:
                // For any other view like 'dashboard', 'orders', etc., we default to showing the product list.
                // This prevents the component from rendering nothing and causing an error.
                return <ProductList {...{ filteredProducts, searchTerm, setSearchTerm, handleAddProduct, handleEditProduct, handleDeleteProduct, setViewProduct }} />;
        }
    };

    // --- PRODUCT DETAILS MODAL ---
    const renderProductDetailsModal = () => {
        if (!viewProduct) return null;
        // Parse More Specs
        const specs = (viewProduct.specifications || '').split('\n').filter(Boolean);
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setViewProduct(null)}>
                <div className="bg-white rounded-lg p-8 relative max-w-lg w-full shadow-2xl m-4" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setViewProduct(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800" aria-label="Close"><X className="w-6 h-6" /></button>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{viewProduct.name}</h2>
                    {viewProduct.image && <Image src={viewProduct.image} alt={viewProduct.name} width={400} height={250} className="w-full h-48 object-cover rounded-lg mb-4"/>}
                    <div className="space-y-2 text-gray-700">
                        <p><b>Category:</b> {viewProduct.category}</p>
                        <p><b>Price:</b> ${viewProduct.price.toFixed(2)}</p>
                        <p><b>Description:</b> {viewProduct.description}</p>
                        <p><b>SKU:</b> {viewProduct.sku || 'N/A'}</p>
                        <p><b>Barcode:</b> {viewProduct.barcode || 'N/A'}</p>
                        <p><b>Discount:</b> {viewProduct.discount}%</p>
                        <p><b>Stock:</b> {viewProduct.products}</p>
                        <p><b>Views:</b> {viewProduct.views.toLocaleString()}</p>
                        <div className="mb-2">
                            <b>More Specs:</b>
                            <ul className="list-disc ml-6 mt-1">
                                {specs.length > 0 ? specs.map((line, idx) => <li key={idx}>{line}</li>) : <li className="text-gray-400">No additional specs provided.</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <NotificationComponent notification={notification} />
            {/* The handleLogout prop is correctly passed to the Sidebar component. */}
            <Sidebar 
                setCurrentView={setCurrentView} 
                currentView={currentView} 
                handleLogout={handleLogout} 
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                {renderCurrentView()}
                {renderProductDetailsModal()}
            </main>
        </div>
    );
};

export default ProductManager;