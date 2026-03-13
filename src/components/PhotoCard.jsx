import { Heart } from 'lucide-react';

export default function PhotoCard({ data, isFav, onLike }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:shadow-xl hover:-translate-y-1 block">
      <div className="aspect-[4/3] w-full bg-gray-200">
        <img
          src={data.download_url}
          alt={data.author}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-white font-medium text-sm truncate pr-2">
          {data.author}
        </h3>
        <button
          onClick={onLike}
          className={`p-1.5 rounded-full transition active:scale-90 ${
            isFav ? 'bg-red-500/20 text-red-500' : 'bg-white/20 text-white hover:bg-white/40'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="absolute top-2 right-2 md:hidden">
        <button
          onClick={onLike}
          className={`p-2 rounded-full bg-white/80 backdrop-blur shadow-sm ${
            isFav ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-3 md:hidden">
        <p className="text-sm font-medium text-gray-800 truncate">{data.author}</p>
      </div>
    </div>
  );
}
