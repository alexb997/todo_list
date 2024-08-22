import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/api/tasks/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        setError("Failed to load task");
        console.error(err);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      const res = await api.put(`/api/tasks/${id}`, {
        title,
        description,
      });
      setSuccess("Task updated successfully!");
      setTimeout(() => navigate("/tasks"), 2000);
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskEdit;
