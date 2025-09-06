import { useState, useEffect } from 'react';
import { attendanceAPI, studentAPI } from '../services/api';

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttendance = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await attendanceAPI.getAttendance();
      let filteredData = response.data;

      if (filters.classId) {
        filteredData = filteredData.filter(item => item.classId === filters.classId);
      }
      if (filters.date) {
        filteredData = filteredData.filter(item => 
          item.createdDate.includes(filters.date)
        );
      }

      setAttendance(filteredData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (attendanceData) => {
    try {
      const response = await attendanceAPI.markAttendance(attendanceData);
      setAttendance(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getStudentAttendance = async (studentId) => {
    try {
      const response = await attendanceAPI.getAttendanceByStudent(studentId);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    attendance,
    loading,
    error,
    fetchAttendance,
    markAttendance,
    getStudentAttendance,
  };
};