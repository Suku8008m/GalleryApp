import { AlertCircle } from 'lucide-react';

export default function ErrorState({ msg }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 text-red-600 rounded-lg max-w-sm mx-auto my-10 border border-red-100">
      <AlertCircle className="w-10 h-10 mb-2" />
      <span className="font-semibold mb-2">Something went wrong</span>
      <p className="text-sm text-center opacity-80 mb-4">{msg || 'Could not load items.'}</p>
      <button 
        onClick={() => window.location.reload()}
        className="text-xs bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}
