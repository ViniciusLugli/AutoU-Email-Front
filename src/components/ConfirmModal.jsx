import PropTypes from "prop-types";

const ConfirmModal = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      />
      <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full z-10">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
};

export default ConfirmModal;
