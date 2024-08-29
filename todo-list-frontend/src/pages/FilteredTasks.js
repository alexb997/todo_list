import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import api from "../api"; 

const DateFilteredTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterType, setFilterType] = useState("dueOnDate");

  const handleFetchTasks = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (filterType === "dueOnDate") {
        response = await api.get("/api/tasks/dueOnDate", {
          params: { date: dateFilter },
        });
      } else if (filterType === "dueBetweenDates") {
        response = await api.get("/api/tasks/dueBetweenDates", {
          params: { startDate, endDate },
        });
      } else if (filterType === "createdOnDate") {
        response = await api.get("/api/tasks/createdOnDate", {
          params: { date: dateFilter },
        });
      } else if (filterType === "createdBetweenDates") {
        response = await api.get("/api/tasks/createdBetweenDates", {
          params: { startDate, endDate },
        });
      }
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Filter Tasks by Date</h2>

      <Form onSubmit={handleFetchTasks} className="mb-4">
        <Form.Group controlId="formFilterType" className="mb-3">
          <Form.Label>Filter Type</Form.Label>
          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            required
          >
            <option value="dueOnDate">Tasks Due On Date</option>
            <option value="dueBetweenDates">Tasks Due Between Dates</option>
            <option value="createdOnDate">Tasks Created On Date</option>
            <option value="createdBetweenDates">Tasks Created Between Dates</option>
          </Form.Control>
        </Form.Group>

        {filterType === "dueOnDate" || filterType === "createdOnDate" ? (
          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              required
            />
          </Form.Group>
        ) : (
          <>
            <Form.Group controlId="formStartDate" className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEndDate" className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit">
          Fetch Tasks
        </Button>
      </Form>

      <h3 className="mt-4">Filtered Tasks</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id}>
            <Card>
              <Card.Header as="h5">{task.title}</Card.Header>
              <Card.Body>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>Start Date: {new Date(task.startDate).toLocaleString()}</Card.Text>
                <Card.Text>End Date: {new Date(task.endDate).toLocaleString()}</Card.Text>
                <Card.Text>Created by: {task.createdBy}</Card.Text>
                <Card.Text>Last edited by: {task.editedBy}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DateFilteredTasks;
