import React, { useState, useEffect } from "react";
import Row from bootstrap;
import api from "../api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/tasks/all");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTaskId) {
      try {
        await api.put(`/api/tasks/update/${editingTaskId}`, {
          title,
          description},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setEditingTaskId(null);
      } catch (error) {
        console.error("Error updating task", error);
      }
    } else {
      try {
        const response = await api.post("/api/tasks", { title, description },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error("Error creating task", error);
      }
    }

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

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
            required
          />
        </div>

        <button type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3 className="mt-4">Your Tasks</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id}>
            <Card>
              <Card.Header as="h5">{task.title}</Card.Header>
              <Card.Body>
                <Card.Title>In Progress</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(task)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskManager;
