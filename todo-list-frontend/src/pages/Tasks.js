import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import api from "../api";

const Tasks = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editedBy, setEditedBy] = useState(localStorage.getItem("username"));
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/tasks/all");
      // const filteredTasks = response.data.filter((task) => {
      //   const taskStartDate = new Date(task.startDate);
      //   const taskEndDate = new Date(task.endDate);
      //   return (
      //     taskStartDate <= selectedDate && taskEndDate >= selectedDate
      //   );
      // });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      createdBy,
      editedBy,
      completed,
      startDate: new Date(),
      endDate: selectedDate || new Date(),
    };

    if (editingTaskId) {
      try {
        await api.put(`/api/tasks/update/${editingTaskId}`, taskData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEditingTaskId(null);
      } catch (error) {
        console.error("Error updating task", error);
      }
    } else {
      taskData.createdBy = localStorage.getItem("username");
      try {
        const response = await api.post("/api/tasks", taskData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
    setCompleted(task.completed);
    setCreatedBy(task.createdBy);
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

      <h3 className="mt-4">Your Tasks</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id}>
            <Card>
              <Card.Header as="h5">{task.title}</Card.Header>
              <Card.Body>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>
                  Start Date: {new Date(task.startDate).toLocaleString()}
                </Card.Text>
                <Card.Text>
                  End Date: {new Date(task.endDate).toLocaleString()}
                </Card.Text>
                <Card.Text>Last Edited At: {new Date(task.lastEditedAt).toLocaleString()}</Card.Text>
                <Card.Text>Created by: {task.createdBy}</Card.Text>
                <Card.Text>Last edited by: {task.editedBy}</Card.Text>
                <Card.Text>Status: {task.completed? "Complete" : "Incomplete"}</Card.Text>
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

export default Tasks;
