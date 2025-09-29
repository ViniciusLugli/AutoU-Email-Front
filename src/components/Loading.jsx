import { Loader2 } from 'lucide-react';

const Loading = ({ size = 'default', text = 'Carregando...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-500`} />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
};

export default Loading;