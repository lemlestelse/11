import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { products } from '../../data/products';

const AdminProducts: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product: typeof products[0]) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Implement delete functionality
      console.log('Deleting product:', id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Products</h1>
        <button
          onClick={handleAddProduct}
          className="btn-primary"
        >
          <Plus size={18} className="mr-2" />
          Add New Product
        </button>
      </div>

      <div className="bg-blackmetal-800 border border-blackmetal-600">
        <div className="grid grid-cols-12 gap-4 p-4 text-grimdark-300 text-sm font-medium border-b border-blackmetal-600">
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Stock Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {products.map(product => (
          <div key={product.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-blackmetal-600">
            <div className="col-span-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="col-span-3">
              <div className="font-medium">{product.name}</div>
              {product.artist && (
                <div className="text-sm text-grimdark-300">{product.artist}</div>
              )}
            </div>
            <div className="col-span-2">
              <span className="text-xs px-2 py-1 bg-blackmetal-700 text-grimdark-300 rounded">
                {product.type}
              </span>
            </div>
            <div className="col-span-2 text-blood-red font-bold">
              R${product.price.toFixed(2)}
            </div>
            <div className="col-span-2">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  product.inStock
                    ? 'bg-green-900/20 text-green-400'
                    : 'bg-red-900/20 text-red-400'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="col-span-2 flex space-x-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="p-2 text-grimdark-300 hover:text-blood-red transition-colors duration-200"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 text-grimdark-300 hover:text-blood-red transition-colors duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal would go here */}
    </div>
  );
};

export default AdminProducts;