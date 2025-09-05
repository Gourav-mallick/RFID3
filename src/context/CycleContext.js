// src/context/CycleContext.js
import React, { createContext, useState } from "react";
import { fetchStudents, submitAttendance } from "../services/api";

export const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycles, setCycles] = useState([]);

  // 🚀 Start a new cycle + fetch students
  const startCycle = async (classId, teacher) => {
    const students = await fetchStudents(classId);

    const newCycle = {
      id: Date.now().toString(),
      classId,
      teacher,
      startTime: new Date().toISOString(),
      students,
      present: [],
      absent: [],
      status: "running",
    };

    setCycles((prev) => [...prev, newCycle]);
    return newCycle.id;
  };

  // ✅ Mark student present/absent
  const markStudent = (cycleId, studentId, status) => {
    setCycles((prev) =>
      prev.map((cycle) =>
        cycle.id === cycleId
          ? {
              ...cycle,
              present:
                status === "present"
                  ? [...new Set([...cycle.present, studentId])]
                  : cycle.present.filter((s) => s !== studentId),
              absent:
                status === "absent"
                  ? [...new Set([...cycle.absent, studentId])]
                  : cycle.absent.filter((s) => s !== studentId),
            }
          : cycle
      )
    );
  };

  // 📌 Submit attendance (send to API)
  const submitCycle = async (cycleId) => {
    const cycle = cycles.find((c) => c.id === cycleId);
    if (!cycle) return;

    await submitAttendance(cycleId, {
      classId: cycle.classId,
      teacher: cycle.teacher,
      present: cycle.present,
      absent: cycle.absent,
      time: cycle.startTime,
    });

    setCycles((prev) =>
      prev.map((c) => (c.id === cycleId ? { ...c, status: "submitted" } : c))
    );
  };

  return (
    <CycleContext.Provider
      value={{ cycles, startCycle, markStudent, submitCycle }}
    >
      {children}
    </CycleContext.Provider>
  );
};
