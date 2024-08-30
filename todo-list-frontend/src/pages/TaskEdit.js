import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold task information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [completed, setCompleted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editedBy, setEditedBy] = useState(localStorage.getItem("username"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the task details
    const fetchTask = async () => {
      try {
        const res = await api.get(`/api/tasks/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCreatedBy(res.data.createdBy);
        setCompleted(res.data.completed);
        setStartDate(res.data.startDate ? new Date(res.data.startDate).toISOString().substring(0, 10) : "");
        setEndDate(res.data.endDate ? new Date(res.data.endDate).toISOString().substring(0, 10) : "");
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
      await api.put(`/api/tasks/${id}`, {
        title,
        description,
        createdBy,
        completed,
        startDate,
        endDate,
        editedBy,
        lastEditedAt: new Date(),
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
        <div>
          <label>Completed:</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TaskEdit;
