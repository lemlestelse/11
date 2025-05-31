import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../data/products';
import { bands } from '../../data/bands';
import { releases } from '../../data/releases';

interface ProductModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      type: 'cd',
      price: 0,
      description: '',
      inStock: true,
      featured: false
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value
    }));
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const band = bands.find(b => b.id === e.target.value);
    if (band) {
      setFormData(prev => ({
        ...prev,
        artist: band.name
      }));
    }
  };

  const handleReleaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const release = releases.find(r => r.id === e.target.value);
    if (release) {
      setFormData(prev => ({
        ...prev,
        release: release.title,
        releaseId: release.id
      }));
    }
  };

  const handleVariantsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const variants = e.target.value.split('\n').filter(variant => variant.trim());
    setFormData(prev => ({ ...prev, variants }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blackmetal-900/80 flex items-center justify-center z-50">
      <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-grimdark-300 hover:text-blood-red">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-grimdark-300 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="input-dark w-full"
            >
              <option value="vinyl">Vinyl</option>
              <option value="cd">CD</option>
              <option value="cassette">Cassette</option>
              <option value="merch">Merchandise</option>
            </select>
          </div>

          {formData.type !== 'merch' && (
            <>
              <div>
                <label className="block text-grimdark-300 mb-1">Artist</label>
                <select
                  onChange={handleArtistChange}
                  className="input-dark w-full"
                >
                  <option value="">Select Artist</option>
                  {bands.map(band => (
                    <option key={band.id} value={band.id}>{band.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-grimdark-300 mb-1">Release</label>
                <select
                  onChange={handleReleaseChange}
                  className="input-dark w-full"
                >
                  <option value="">Select Release</option>
                  {releases.map(release => (
                    <option key={release.id} value={release.id}>{release.title}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-grimdark-300 mb-1">Price (R$) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Variants (one per line)</label>
            <textarea
              value={formData.variants?.join('\n')}
              onChange={handleVariantsChange}
              rows={4}
              className="input-dark w-full"
              placeholder="S
M
L
XL"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="mr-2"
              />
              In Stock
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="mr-2"
              />
              Featured Product
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;