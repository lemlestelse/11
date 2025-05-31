import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { releases } from '../../data/releases';
import ReleaseModal from '../../components/modals/ReleaseModal';

const AdminReleases: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRelease, setEditingRelease] = useState<typeof releases[0] | null>(null);

  const handleAddRelease = () => {
    setEditingRelease(null);
    setIsModalOpen(true);
  };

  const handleEditRelease = (release: typeof releases[0]) => {
    setEditingRelease(release);
    setIsModalOpen(true);
  };

  const handleDeleteRelease = (id: string) => {
    if (window.confirm('Are you sure you want to delete this release?')) {
      // Implement delete functionality
      console.log('Deleting release:', id);
    }
  };

  const handleSaveRelease = (releaseData: Partial<typeof releases[0]>) => {
    if (editingRelease) {
      // Update existing release
      console.log('Updating release:', releaseData);
    } else {
      // Add new release
      console.log('Adding new release:', releaseData);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Releases</h1>
        <button
          onClick={handleAddRelease}
          className="btn-primary"
        >
          <Plus size={18} className="mr-2" />
          Add New Release
        </button>
      </div>

      <div className="bg-blackmetal-800 border border-blackmetal-600">
        <div className="grid grid-cols-12 gap-4 p-4 text-grimdark-300 text-sm font-medium border-b border-blackmetal-600">
          <div className="col-span-1">Cover</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-2">Artist</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-1">Format</div>
          <div className="col-span-2">Actions</div>
        </div>

        {releases.map(release => (
          <div key={release.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-blackmetal-600">
            <div className="col-span-1">
              <img
                src={release.image}
                alt={release.title}
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="col-span-3 font-medium">{release.title}</div>
            <div className="col-span-2 text-grimdark-300">{release.artist}</div>
            <div className="col-span-1 text-grimdark-300">{release.year}</div>
            <div className="col-span-2">
              <span className="text-xs px-2 py-1 bg-blackmetal-700 text-grimdark-300 rounded">
                {release.type}
              </span>
            </div>
            <div className="col-span-1">
              <div className="flex flex-wrap gap-1">
                {release.format.map(format => (
                  <span
                    key={format}
                    className="text-xs px-2 py-1 bg-blackmetal-700 text-grimdark-300 rounded"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex space-x-2">
              <button
                onClick={() => handleEditRelease(release)}
                className="p-2 text-grimdark-300 hover:text-blood-red transition-colors duration-200"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDeleteRelease(release.id)}
                className="p-2 text-grimdark-300 hover:text-blood-red transition-colors duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReleaseModal
        release={editingRelease}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRelease}
      />
    </div>
  );
};