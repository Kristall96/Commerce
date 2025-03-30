import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });

  useEffect(() => {
    if (user?.isAdmin) {
      fetchAllUsers();
    }
  }, [user]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users", {
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
        console.error("Expected array but got:", data);
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
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
        }

        alert(data.message || "Profile updated!");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleToggleAdmin = async (userId, makeAdmin) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}/make-admin`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ makeAdmin }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: makeAdmin } : user
          )
        );
      } else {
        alert(data.message || "Failed to update admin status.");
      }
    } catch (err) {
      console.error("Error toggling admin:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${editingUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser ? { ...u, ...editForm } : u))
        );
        setEditingUser(null);
      } else {
        alert(data.message || "Failed to update user.");
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const renderedAdminTable = useMemo(() => {
    return (
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
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        )}
      </>
    );
  }, [users, editingUser, editForm]);

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
        <button type="submit">Update My Info</button>
      </form>

      {user?.isAdmin && renderedAdminTable}
    </div>
  );
};

export default Profile;
