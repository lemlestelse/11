import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Release } from '../../data/releases';
import { bands } from '../../data/bands';

interface ReleaseModalProps {
  release?: Release;
  isOpen: boolean;
  onClose: () => void;
  onSave: (release: Partial<Release>) => void;
}

const ReleaseModal: React.FC<ReleaseModalProps> = ({ release, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Release>>(
    release || {
      title: '',
      artist: '',
      artistId: '',
      year: new Date().getFullYear(),
      type: 'Full-length',
      description: '',
      tracklist: [],
      format: [],
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
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const band = bands.find(b => b.id === e.target.value);
    if (band) {
      setFormData(prev => ({
        ...prev,
        artist: band.name,
        artistId: band.id
      }));
    }
  };

  const handleTracklistChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tracks = e.target.value.split('\n').filter(track => track.trim());
    setFormData(prev => ({ ...prev, tracklist: tracks }));
  };

  const handleFormatChange = (format: string) => {
    setFormData(prev => ({
      ...prev,
      format: prev.format?.includes(format)
        ? prev.format.filter(f => f !== format)
        : [...(prev.format || []), format]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blackmetal-900/80 flex items-center justify-center z-50">
      <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{release ? 'Edit Release' : 'Add New Release'}</h2>
          <button onClick={onClose} className="text-grimdark-300 hover:text-blood-red">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-grimdark-300 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Artist *</label>
            <select
              value={formData.artistId}
              onChange={handleArtistChange}
              required
              className="input-dark w-full"
            >
              <option value="">Select Artist</option>
              {bands.map(band => (
                <option key={band.id} value={band.id}>{band.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Year *</label>
            <input
              type="number"
              name="year"
              value={formData.year}
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
              <option value="Full-length">Full-length</option>
              <option value="EP">EP</option>
              <option value="Single">Single</option>
              <option value="Split">Split</option>
              <option value="Compilation">Compilation</option>
              <option value="Demo">Demo</option>
            </select>
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
            <label className="block text-grimdark-300 mb-1">Tracklist (one track per line) *</label>
            <textarea
              value={formData.tracklist?.join('\n')}
              onChange={handleTracklistChange}
              required
              rows={6}
              className="input-dark w-full"
              placeholder="1. Track Name
2. Track Name"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-2">Available Formats *</label>
            <div className="space-x-4">
              {['Vinyl', 'CD', 'Digital', 'Cassette'].map(format => (
                <label key={format} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.format?.includes(format as any)}
                    onChange={() => handleFormatChange(format)}
                    className="mr-2"
                  />
                  {format}
                </label>
              ))}
            </div>
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
              Featured Release
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {release ? 'Update Release' : 'Add Release'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReleaseModal;