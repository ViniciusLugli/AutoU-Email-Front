import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth.jsx";
import { userService } from "../services";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

const UserModal = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (open && user) {
      (async () => {
        try {
          const data = await userService.getCurrentUser();
          setForm({ username: data.username || "", email: data.email || "" });
        } catch {
          toast.error("Error loading user");
        }
      })();
    }
  }, [open, user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { ...form };

      console.log("Updating user with payload:", payload);

      const passwordFieldsFilled =
        currentPassword || newPassword || confirmPassword;
      if (passwordFieldsFilled) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          toast.error("Please fill all password fields before saving");
          setLoading(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("New password and confirmation do not match");
          setLoading(false);
          return;
        }
        if (newPassword.length < 8) {
          toast.error("New password must be at least 8 characters long");
          setLoading(false);
          return;
        }

        payload.current_password = currentPassword;
        payload.new_password = newPassword;

        console.log("Updating password with payload:", payload);
      }

      await userService.updateCurrentUser(payload);
      toast.success("User updated");
      onClose();
    } catch {
      toast.error("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const ok = await userService.deleteCurrentUser();
      if (ok) {
        toast.success("User deleted");
        logout();
      } else {
        toast.error("Failed to delete user");
      }
    } catch {
      toast.error("Error deleting user");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full z-10">
        <h3 className="text-lg font-semibold text-white mb-4">Edit User</h3>

        <label className="block text-sm text-gray-300">Name</label>
        <input
          value={form.username}
          onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-3"
        />

        <label className="block text-sm text-gray-300">Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-3"
        />

        <div className="mt-4 border-t border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-200 mb-2">
            Change password
          </h4>

          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-400">
                Current password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                }}
                className="px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-3">
          <div className="flex justify-start">
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full sm:w-auto px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
            >
              Delete account
            </button>
          </div>

          <div className="flex justify-end items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
            >
              Salvar
            </button>
          </div>
        </div>

        <ConfirmModal
          open={confirmOpen}
          title="Confirm deletion"
          description="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
          confirmText="Delete"
        />
      </div>
    </div>
  );
};

UserModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default UserModal;
