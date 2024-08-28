import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import api from "../api"; // Assumes api is configured to interact with your backend

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchUserTasks(storedUsername);
    }
  }, []);

  const fetchUserTasks = async (username) => {
    try {
      const response = await api.get("/api/tasks/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Filter tasks where `createdBy` matches the logged-in user's username
      const userTasks = response.data.filter(
        (task) => task.createdBy === username
      );
      setTasks(userTasks);
    } catch (error) {
      console.error("Error fetching user tasks", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Profile</h1>
      {username && (
        <p className="text-center">
          Welcome, <strong>{username}</strong>! Here are your tasks:
        </p>
      )}
      <Row xs={1} md={2} lg={3} className="g-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col key={task._id}>
              <Card>
                <Card.Header as="h5">{task.title}</Card.Header>
                <Card.Body>
                  <Card.Text>Description: {task.description}</Card.Text>
                  <Card.Text>Start Date: {new Date(task.startDate).toLocaleString()}</Card.Text>
                  <Card.Text>End Date: {new Date(task.endDate).toLocaleString()}</Card.Text>
                  <Card.Text>Last Edited: {new Date(task.lastEditedAt).toLocaleString()}</Card.Text>
                  <Card.Text>Edited by: {task.editedBy}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => console.log(`Viewing task ${task._id}`)}
                    className="me-2"
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => console.log(`Editing task ${task._id}`)}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No tasks found for {username}.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
