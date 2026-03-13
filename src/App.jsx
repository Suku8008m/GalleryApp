import { useState, useReducer, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { favReducer, initFavs } from './reducers/favouriteReducer';
import PhotoCard from './components/PhotoCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import { Camera, ImageOff, Heart } from 'lucide-react';

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewSaved, setViewSaved] = useState(false);
  
  const [favs, dispatch] = useReducer(favReducer, [], initFavs);

  const onSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const toggleLike = useCallback((photo) => {
    dispatch({ type: 'TOGGLE', payload: photo });
  }, []);

  const displayedList = useMemo(() => {
    const list = viewSaved ? favs : photos;
    if (!searchTerm.trim()) return list;
    
    const q = searchTerm.toLowerCase().trim();
    return list.filter(p => p.author.toLowerCase().includes(q));
  }, [photos, favs, searchTerm, viewSaved]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded drop-shadow">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gallery App</h1>
                <p className="text-xs text-gray-500">Find cool photos</p>
              </div>
            </div>
            
            <div className="w-full md:max-w-md">
              <SearchBar value={searchTerm} onChange={onSearch} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!loading && !error && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {viewSaved 
                ? (searchTerm ? `Saved (${displayedList.length})` : 'My Favorites')
                : (searchTerm ? `Results (${displayedList.length})` : 'All Photos')
              }
            </h2>
            <button 
              onClick={() => setViewSaved(!viewSaved)}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded shadow-sm border ${
                viewSaved 
                  ? 'bg-amber-500 text-white border-amber-500' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${viewSaved ? 'fill-current' : 'text-gray-400'}`} />
              {viewSaved ? 'Back to all' : `Saved (${favs.length})`}
            </button>
          </div>
        )}

        {loading && <LoadingSpinner />}
        {error && <ErrorState msg={error} />}

        {!loading && !error && displayedList.length === 0 && (
          <div className="py-20 text-center">
            {viewSaved && favs.length === 0 && !searchTerm ? (
              <div className="flex flex-col items-center">
                <svg className="w-40 h-40 mb-4 opacity-50" viewBox="0 0 200 200" fill="none">
                  <path d="M100 170L34 104C16.3 86.3 16.3 57.7 34 40C51.7 22.3 80.3 22.3 98 40L100 42L102 40C119.7 22.3 148.3 22.3 166 40C183.7 57.7 183.7 86.3 166 104L100 170Z" fill="#e5e7eb" />
                </svg>
                <h3 className="text-xl font-bold text-gray-700">No favorites</h3>
                <p className="text-gray-500 mt-2 mb-6 text-sm">You haven't liked any photos yet.</p>
                <button 
                  onClick={() => setViewSaved(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go explore
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {viewSaved ? <ImageOff className="w-8 h-8 text-gray-400" /> : <Camera className="w-8 h-8 text-gray-400" />}
                </div>
                <h3 className="text-lg font-medium text-gray-800 text-center mb-1">Nothing found</h3>
                <p className="text-gray-500 text-sm">
                  Try searching for a different name.
                </p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && displayedList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedList.map((p) => (
              <PhotoCard 
                key={p.id} 
                data={p} 
                isFav={favs.some(f => f.id === p.id)}
                onLike={() => toggleLike(p)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
