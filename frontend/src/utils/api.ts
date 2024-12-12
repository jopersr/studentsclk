// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const fetchStudents = async () => {
  const { data } = await api.get('/students');
  console.log(data);
  return data;
};

export const fetchClasses = async () => {
  const { data } = await api.get('/classes');
  return data;
};

interface CreateStudentData {
  firstName: string;
  lastName: string;
  email: string;
  class: string;
}

export const createStudent = async (studentData: CreateStudentData) => {
  const { data } = await api.post('/students', studentData);
  
  return data;
};

interface CreateClassData {
  name: string;
  year: number;
}

export const createClass = async (classData: CreateClassData) => {
  const { data } = await api.post('/classes', classData);
  return data;
};
