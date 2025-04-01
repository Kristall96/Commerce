import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Message from "../ui/Message";
import "./Profile.css";
import { BASE_URL } from "./api/config";
const Profile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [editError, setEditError] = useState("");

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user?.isAdmin) {
      fetchAllUsers();
    }
  }, [user?._id, user?.isAdmin]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("${BASE_URL}/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Unauthorized");
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("${BASE_URL}/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const hasChanges =
          user.username !== data.user.username ||
          user.email !== data.user.email;

        if (hasChanges) {
          login(data.user, data.token);
          setFormData({
            username: data.user.username,
            email: data.user.email,
            password: "",
          });
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === data.user._id ? { ...u, ...data.user } : u
            )
          );
        }

        setMessage({
          type: "success",
          text: data.message || "Profile updated!",
        });
      } else {
        setMessage({ type: "error", text: data.message || "Update failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleToggleAdmin = async (userId, makeAdmin) => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/make-admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ makeAdmin }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: makeAdmin } : user
          )
        );
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleSaveEdit = async () => {
    try {
      setEditError("");

      const res = await fetch(`${BASE_URL}/api/users/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editForm),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Invalid JSON response:", jsonErr);
        data = { message: "Server returned invalid response." };
      }

      if (!res.ok) {
        setEditError(data.message || "Failed to update user.");
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser ? { ...u, ...editForm } : u))
      );

      if (editingUser === user._id) {
        const updatedUser = { ...user, ...editForm };
        login(updatedUser, localStorage.getItem("token"));
        setFormData({
          username: updatedUser.username,
          email: updatedUser.email,
          password: "",
        });
      }
      setMessage({
        type: "success",
        text: data.message || "Profile updated!",
      });
      setEditingUser(null);
    } catch (err) {
      console.error("Network/server error:", err);
      setEditError("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user?.username}</h2>
      <p>Email: {user?.email}</p>

      <form onSubmit={handleUpdate} className="edit-form">
        <input
          type="text"
          placeholder="New username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="New email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="New password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <div className="form-buttons">
          <button type="submit">Update My Info</button>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </form>
      <div>
        {message.text && (
          <Message
            type={message.type}
            text={message.text}
            onClose={() => setMessage({ type: "", text: "" })}
          />
        )}
      </div>

      {user?.isAdmin && (
        <>
          <h3>All Users</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <div
                        className={`admin-toggle ${u.isAdmin ? "on" : "off"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleAdmin(u._id, !u.isAdmin);
                        }}
                        title={u.isAdmin ? "Revoke admin" : "Make admin"}
                      >
                        <div className="circle" />
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setEditingUser(u._id);
                          setEditForm({
                            username: u.username,
                            email: u.email,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUser(u._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {editingUser && (
            <div className="edit-user-modal">
              <h3>Edit User</h3>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                placeholder="Username"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="Email"
              />

              {editError && <div className="error-message">{editError}</div>}

              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
