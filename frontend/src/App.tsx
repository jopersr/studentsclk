import { useState } from 'react';
import './App.css'
import CreateStudentModal from './components/organisms/CreateStudentModal';
import HeaderMenu from './components/organisms/HeaderMenu';
import UsersGallery from './components/organisms/UserGallery';
import CreateClassModal from './components/organisms/CreateClassModal';
import ManageClassesModal from './components/organisms/ManageClassModal';
import { createClass, createStudent, deleteStudent, fetchClasses, fetchStudents, updateStudent } from './utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, LinearProgress, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Class, StudentFormData } from './utils/types';
import ConfirmDialog from './components/molecules/ConfirmDialog';


function App() {  
const [openCreateStudentModal, setOpenCreateStudentModal] = useState(false);
const [editingStudent, setEditingStudent] = useState<null | StudentFormData>(null);
const [openCreateClassModal, setOpenCreateClassModal] = useState(false);
const [openManageClassesModal, setOpenManageClassesModal] = useState(false);
const [openConfirm, setOpenConfirm] = useState(false);
const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
const queryClient = useQueryClient();
const { enqueueSnackbar } = useSnackbar();

const { data: students, error, isLoading } = useQuery({ queryKey: [ 'students' ], queryFn: fetchStudents });

const { data: classes, error: classesError, isLoading: isLoadingClasses } = useQuery({
  queryKey: ['classes'],
  queryFn: fetchClasses
});

const { mutate: createStudentMutate, isLoading: isCreating } = useMutation({
  mutationFn: createStudent,
  onSuccess: () => {    
    queryClient.invalidateQueries({ queryKey: ['students'] });    
    setOpenCreateStudentModal(false);
    enqueueSnackbar('Student created successfully.', { variant: 'success' });
  },
  onError: (err) => {
    console.error('Error creating student:', err);    
    enqueueSnackbar('Failed to create student. Please try again.', { variant: 'error' });
  }
});

const { mutate: updateStudentMutate, isLoading: isUpdating } = useMutation({
  mutationFn: updateStudent,
  onSuccess: () => {    
    queryClient.invalidateQueries({ queryKey: ['students'] });    
    setOpenCreateStudentModal(false);
    enqueueSnackbar('Student updated successfully.', { variant: 'success' });
  },
  onError: (err) => {
    console.error('Error creating student:', err);    
    enqueueSnackbar('Failed to update student. Please try again.', { variant: 'error' });
  }
});

const handleCreateStudent = () => {
  setEditingStudent(null);
  setOpenCreateStudentModal(true);
};

const handleEditStudent = (student: StudentFormData) => {
  setEditingStudent(student);
  setOpenCreateStudentModal(true);
};

const handleStudentSubmit = (data: StudentFormData) => {
  if (editingStudent && editingStudent.id) {
    // Llamar a updateStudentMutate
    updateStudentMutate({ id: editingStudent.id, data });
  } else {
    // Llamar a createStudentMutate
    createStudentMutate(data);
  }
};

const { mutate: createClassMutate, isLoading: isCreatingClass } = useMutation({
  mutationFn: createClass,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['classes'] });
    setOpenCreateClassModal(false);
    enqueueSnackbar('Class created successfully.', { variant: 'success' });
  },
  onError: (err) => {
    console.error('Error creating class:', err);
    enqueueSnackbar('Failed to create class. Please try again.', { variant: 'error' });
  }
});

const { mutate: deleteStudentMutate } = useMutation({
  mutationFn: deleteStudent,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['students']});
    enqueueSnackbar('Student deleted successfully.', { variant: 'success' });
  },
  onError: (err) => {
    console.error('Error deleting student:', err);
    enqueueSnackbar('Failed to delete student. Please try again.', { variant: 'error' });
  },
});

const handleDeleteStudent = (id: string) => {
  deleteStudentMutate(id);
};

const handleDeleteClick = (id: string) => {
  setSelectedStudentId(id);
  setOpenConfirm(true);
};

const handleConfirmDelete = () => {
  if (selectedStudentId) {
    deleteStudentMutate(selectedStudentId);
  }
  setOpenConfirm(false);
  setSelectedStudentId(null);
};

const handleCancelDelete = () => {
  setOpenConfirm(false);
  setSelectedStudentId(null);
};

if (isLoading) return (<div>
 <div>Loading students...</div>
 <LinearProgress />
</div>);

if (error) return <Alert severity='error' >Error loading students.</Alert>;

  return (
    <>
     <Paper 
        elevation={3} 
        style={{           
          margin: '20px',     
          overflow: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px'
        }}
      >
      <HeaderMenu 
        onCreateStudent={handleCreateStudent} 
        onCreateClass={() => setOpenCreateClassModal(true)} 
        onManageClasses={() => setOpenManageClassesModal(true)}
      />
      </Paper>
      <CreateStudentModal 
        open={openCreateStudentModal} 
        onSubmit={handleStudentSubmit} 
        onClose={() => setOpenCreateStudentModal(false)} 
        classesOptions={classes.map((c: Class) => ({ id: c._id, name: c.className }))}
        student={editingStudent}
      />
      <CreateClassModal 
        open={openCreateClassModal}
        onSubmit={createClassMutate}
        onClose={() => setOpenCreateClassModal(false)}
      />
      <ManageClassesModal
        open={openManageClassesModal}
        onClose={() => setOpenManageClassesModal(false)}
        classesList={classes.map((c: Class) => ({ id: c._id, name: c.className }))}
        onEditClass={(id) => console.log('edit', id)}
        onDeleteClass={(id) => console.log('delete', id)}
      />
       <ConfirmDialog 
        open={openConfirm} 
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        message="This action is irreversible. Are you sure you want to delete this student?"
      />
     <Paper 
        elevation={3} 
        style={{ 
          padding: '20px', 
          margin: '20px',
          height: 'calc(100vh - 165px)',
          overflow: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px'
        }}
      >
        <UsersGallery users={students} onEdit={handleEditStudent} onDelete={handleDeleteClick}/>    
      </Paper>
    </>
  )
}

export default App
