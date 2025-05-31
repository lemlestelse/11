import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { bands as initialBands, updateBands } from '../../data/bands';
import BandModal from '../../components/modals/BandModal';
import { Band } from '../../data/bands';

const AdminBands: React.FC = () => {
  const [bands, setBands] = useState<Band[]>(initialBands);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBand, setEditingBand] = useState<Band | null>(null);

  const handleAddBand = () => {
    setEditingBand(null);
    setIsModalOpen(true);
  };

  const handleEditBand = (band: Band) => {
    setEditingBand(band);
    setIsModalOpen(true);
  };

  const handleDeleteBand = (id: string) => {
    if (window.confirm('Are you sure you want to delete this band?')) {
      const updatedBands = bands.filter(band => band.id !== id);
      setBands(updatedBands);
      updateBands(updatedBands);
    }
  };

  const handleSaveBand = (bandData: Partial<Band>) => {
    let updatedBands: Band[];
    
    if (editingBand) {
      // Update existing band
      updatedBands = bands.map(band => 
        band.id === editingBand.id ? { ...band, ...bandData } : band
      );
    } else {
      // Add new band
      updatedBands = [...bands, bandData as Band];
    }
    
    setBands(updatedBands);
    updateBands(updatedBands);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Bands</h1>
        <button
          onClick={handleAddBand}
          className="btn-primary"
        >
          <Plus size={18} className="mr-2" />
          Add New Band
        </button>
      </div>

      <div className="bg-blackmetal-800 border border-blackmetal-600">
        <div className="grid grid-cols-12 gap-4 p-4 text-grimdark-300 text-sm font-medium border-b border-blackmetal-600">
          <div className="col-span-1">Image</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Country</div>
          <div className="col-span-2">Formed In</div>
          <div className="col-span-3">Genres</div>
          <div className="col-span-2">Actions</div>
        </div>

        {bands.map(band => (
          <div key={band.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-blackmetal-600">
            <div className="col-span-1">
              <img
                src={band.image}
                alt={band.name}
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="col-span-2 font-medium">{band.name}</div>
            <div className="col-span-2 text-grimdark-300">{band.country}</div>
            <div className="col-span-2 text-grimdark-300">{band.formedIn}</div>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2">
                {band.genres.map(genre => (
                  <span
                    key={genre}
                    className="text-xs px-2 py-1 bg-blackmetal-700 text-grimdark-300 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex space-x-2">
              <button
                onClick={() => handleEditBand(band)}
                className="p-2 text-grimdark-300 hover:text-blood-red transition-colors duration-200"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDeleteBand(band.id)}
                className="p-2 text-grimdark-300 hover:text-blood-red transition-colors duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BandModal
        band={editingBand}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBand}
      />
    </div>
  );
};

export default AdminBands;