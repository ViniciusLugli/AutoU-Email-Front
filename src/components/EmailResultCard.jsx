import { useState } from "react";
import PropTypes from "prop-types";
import ConfirmModal from "./ConfirmModal";
import { textService } from "../services";
import toast from "react-hot-toast";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import {
  formatDate,
  truncateText,
  getCategoryColor,
  normalizeLineBreaks,
} from "../utils/formatters";

const EmailResultCard = ({ text, index, onDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case "PROCESSING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Processando":
        return "text-orange-400";
      case "Concluído":
        return "text-green-400";
      case "Falhou":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getCategoryBadge = (category) => {
    if (!category) return null;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
          category
        )}`}
      >
        {category}
      </span>
    );
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const ok = await textService.deleteText(text.id);
      if (ok) {
        toast.success("Email deleted");
        setConfirmOpen(false);
        if (typeof onDeleted === "function") {
          onDeleted(text.id);
        } else if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Error deleting item");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      key={text.id || index}
      className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(text.status)}
          <span
            className={`text-sm font-medium ${getStatusClass(text.status)}`}
          >
            {text.status || "Unknown"}
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
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-1">
            Original Text:
          </h4>
          <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded whitespace-pre-wrap break-words">
            {isExpanded
              ? normalizeLineBreaks(text.original_text) || "Not available"
              : truncateText(normalizeLineBreaks(text.original_text), 150) ||
                "Not available"}
          </p>
        </div>

        {text.generated_response && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1">
              Suggested Response:
            </h4>
            <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded whitespace-pre-wrap break-words">
              {isExpanded
                ? normalizeLineBreaks(text.generated_response)
                : truncateText(
                    normalizeLineBreaks(text.generated_response),
                    150
                  )}
            </p>
          </div>
        )}

        {text.processed_text && isExpanded && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-1">
              Processed Text:
            </h4>
            <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded whitespace-pre-wrap break-words">
              {normalizeLineBreaks(text.processed_text)}
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Confirm deletion"
        description="Do you really want to delete this processed email?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />
    </div>
  );
};

EmailResultCard.propTypes = {
  text: PropTypes.object.isRequired,
  index: PropTypes.number,
  onDeleted: PropTypes.func,
};

export default EmailResultCard;
