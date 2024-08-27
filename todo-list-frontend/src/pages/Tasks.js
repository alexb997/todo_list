import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import api from "../api";
import CalendarComponent from "../components/Calendar";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("stef");
  const [editedBy, setEditedBy] = useState("stef");
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
      setEditedBy(localStorage.getItem("username"));
      try {
        await api.put(
          `/api/tasks/update/${editingTaskId}`,
          { title, description, editedBy, editedBy },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEditingTaskId(null);
      } catch (error) {
        console.error("Error updating task", error);
      }
    } else {
      setCreatedBy(localStorage.getItem("username"));
      setEditedBy(createdBy);
      try {
        const response = await api.post(
          "/api/tasks",
          { title, description, createdBy, editedBy },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error("Error creating task", error);
      }
    }

    setTitle("");
    setDescription("");
    setEditedBy("");
    setCreatedBy("");
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
    <Container>
      <h2 className="my-4 text-center">Task Manager</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </Button>
      </Form>
      <CalendarComponent />
      <h3 className="mt-4">Your Tasks</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id}>
            <Card>
              <Card.Header as="h5">{task.title}</Card.Header>
              <Card.Body>
                <Card.Title>In Progress</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>Created by: {task.createdBy}</Card.Text>
                <Card.Text>Last edited by: {task.editedBy}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(task)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskManager;
