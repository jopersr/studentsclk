import axios from 'axios';
import {  ClassFormData, StudentFormData } from './types';

const api = axios.create({
  baseURL: `${window.location.origin.split(':')[0]}://${window.location.hostname}:3000`, 
});

export const fetchStudents = async () => {
  const { data } = await api.get('/students');  
  return data;
};

export const createStudent = async (studentData: StudentFormData) => {
  const { data } = await api.post('/students', studentData);
  
  return data;
};

export const updateStudent = async ( {id, data}: { id: string, data: StudentFormData}) => {
  const { data: updated } = await api.put(`/students/${id}`, data);
  return updated;
};

export const deleteStudent = async (id: string) => {
  const {data } = await api.delete(`/students/${id}`);
  return data;
};

export const fetchClasses = async () => {
  const { data } = await api.get('/classes');
  return data;
};

export const createClass = async (classData: ClassFormData) => {
  const { data } = await api.post('/classes', classData);
  return data;
};

export const updateClass = async ({ id, data }: { id: string, data: ClassFormData}) => {
  const { data: updated } = await api.put(`/classes/${id}`, data);
  return updated;
};

export const deleteClass = async (id: string) => {
  await api.delete(`/classes/${id}`);
  return id;
};

