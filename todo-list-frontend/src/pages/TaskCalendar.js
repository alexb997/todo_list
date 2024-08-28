import React, { useState } from "react";
import CalendarComponent from "../components/Calendar";
import TaskManager from "./Tasks";

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Task Calendar</h1>
      <CalendarComponent onDateChange={handleDateChange} />
      <TaskManager selectedDate={selectedDate} />
    </div>
  );
};

export default TaskCalendar;
