import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Band } from '../../data/bands';

interface BandModalProps {
  band?: Band;
  isOpen: boolean;
  onClose: () => void;
  onSave: (band: Partial<Band>) => void;
}

const BandModal: React.FC<BandModalProps> = ({ band, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Band>>(
    band || {
      name: '',
      country: '',
      formedIn: new Date().getFullYear(),
      genres: [],
      bio: '',
      members: [],
      discography: [],
      featured: false
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(',').map(g => g.trim());
    setFormData(prev => ({ ...prev, genres }));
  };

  const handleMemberAdd = () => {
    setFormData(prev => ({
      ...prev,
      members: [...(prev.members || []), { name: '', role: '' }]
    }));
  };

  const handleMemberChange = (index: number, field: 'name' | 'role', value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members?.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const handleMemberRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members?.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blackmetal-900/80 flex items-center justify-center z-50">
      <div className="bg-blackmetal-800 border border-blackmetal-600 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{band ? 'Edit Band' : 'Add New Band'}</h2>
          <button onClick={onClose} className="text-grimdark-300 hover:text-blood-red">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-grimdark-300 mb-1">Band Name *</label>
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
            <label className="block text-grimdark-300 mb-1">Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Formed In *</label>
            <input
              type="number"
              name="formedIn"
              value={formData.formedIn}
              onChange={handleInputChange}
              required
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Genres (comma-separated) *</label>
            <input
              type="text"
              name="genres"
              value={formData.genres?.join(', ')}
              onChange={handleGenreChange}
              required
              className="input-dark w-full"
              placeholder="Black Metal, Death Metal, etc."
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-1">Biography *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={4}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-grimdark-300 mb-4">Members</label>
            <div className="space-y-4">
              {formData.members?.map((member, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    placeholder="Name"
                    className="input-dark flex-1"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                    placeholder="Role"
                    className="input-dark flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleMemberRemove(index)}
                    className="btn-secondary"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleMemberAdd}
                className="btn-outline w-full"
              >
                Add Member
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-grimdark-300">Featured Band</label>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {band ? 'Update Band' : 'Add Band'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BandModal;