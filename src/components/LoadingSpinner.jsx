import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      <span className="text-sm text-gray-500 font-medium">Loading...</span>
    </div>
  );
}
