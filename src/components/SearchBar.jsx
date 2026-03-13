import { Search } from 'lucide-react';
import { memo } from 'react';

const SearchBar = memo(({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        className="w-full pl-9 pr-3 py-2 bg-gray-100/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-shadow"
        placeholder="Type an author name..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default SearchBar;
