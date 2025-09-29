import { Clock, CheckCircle, XCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { formatDate, truncateText, getCategoryColor } from '../utils/formatters';

const EmailResultCard = ({ text, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PROCESSING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PROCESSING':
        return 'Processando';
      case 'COMPLETED':
        return 'Concluído';
      case 'FAILED':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  const getCategoryBadge = (category) => {
    if (!category) return null;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
        {category}
      </span>
    );
  };

  return (
    <div key={text.id || index} className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(text.status)}
          <span className="text-sm font-medium text-gray-300">
            {getStatusText(text.status)}
          </span>
          {text.category && getCategoryBadge(text.category)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {formatDate(text.created_at)}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-300 transition-colors"
            title={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {isExpanded ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-1">Texto Original:</h4>
          <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded">
            {isExpanded 
              ? (text.original_text || 'Não disponível')
              : (truncateText(text.original_text, 150) || 'Não disponível')
            }
          </p>
        </div>
        
        {text.generated_response && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1">Resposta Sugerida:</h4>
            <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded">
              {isExpanded 
                ? text.generated_response
                : truncateText(text.generated_response, 150)
              }
            </p>
          </div>
        )}

        {text.processed_text && isExpanded && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1">Texto Processado:</h4>
            <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded">
              {text.processed_text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailResultCard;