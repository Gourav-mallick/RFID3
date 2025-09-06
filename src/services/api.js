import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Auth APIs
export const authAPI = {
  login: (username, password) => 
    api.get('/login', {
      params: { username, password }
    }),

  register: (userData) => 
    api.post('/login', userData),
};

// Institution APIs
export const institutionAPI = {
  getInstitution: () => api.get('/institution'),
  getInstitutionData: () => api.get('/institutionData'),
};

// Student APIs
export const studentAPI = {
  getStudents: () => api.get('/students'),
  getStudentById: (id) => api.get(`/students/${id}`),
  getStudentsByClass: (classId) => 
    api.get('/students', { params: { classId } }),
  registerStudent: (studentData) => 
    api.post('/students', studentData),
};

// Teacher APIs
export const teacherAPI = {
  getTeachers: () => api.get('/teachers'),
  getTeacherById: (id) => api.get(`/teachers/${id}`),
};

// Class APIs
export const classAPI = {
  getClasses: () => api.get('/classes'),
  getClassById: (id) => api.get(`/classes/${id}`),
};

// Subject APIs
export const subjectAPI = {
  getSubjects: () => api.get('/subjects'),
  getSubjectById: (id) => api.get(`/subjects/${id}`),
  getSubjectsByClass: (classId) => 
    api.get('/subjects', { params: { classId } }),
};

// Attendance APIs
export const attendanceAPI = {
  getAttendance: () => api.get('/attendance'),
  getAttendanceByStudent: (studentId) => 
    api.get('/attendance', { params: { stuId: studentId } }),
  getAttendanceByClass: (classId) => 
    api.get('/attendance', { params: { classId } }),
  getAttendanceByDate: (date) => 
    api.get('/attendance', { params: { createdDate_like: date } }),
  markAttendance: (attendanceData) => 
    api.post('/attendance', attendanceData),
  updateAttendance: (id, attendanceData) => 
    api.put(`/attendance/${id}`, attendanceData),
};

// Period APIs
export const periodAPI = {
  getPeriods: () => api.get('/periods'),
  getPeriodById: (id) => api.get(`/periods/${id}`),
};

// Report APIs
export const reportAPI = {
  getReports: () => api.get('/reports'),
  generateReport: (reportData) => 
    api.post('/reports', reportData),
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export default api;