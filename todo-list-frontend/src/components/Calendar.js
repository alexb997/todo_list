import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import TaskManager from "./TaskManager";

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

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
