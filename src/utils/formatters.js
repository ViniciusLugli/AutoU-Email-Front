// Utilitários para formatação e helpers

export const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Data inválida';
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop().toLowerCase();
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'processing':
      return 'text-yellow-500';
    case 'completed':
      return 'text-green-500';
    case 'failed':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getCategoryColor = (category) => {
  if (!category) return 'bg-gray-100 text-gray-800';
  
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('produtiv')) {
    return 'bg-green-100 text-green-800';
  }
  return 'bg-red-100 text-red-800';
};