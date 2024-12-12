import { useState } from 'react';
import './App.css'
import CreateStudentModal from './components/organisms/CreateStudentModal';
import HeaderMenu from './components/organisms/HeaderMenu';
import UsersGallery from './components/organisms/UserGallery';
import CreateClassModal from './components/organisms/CreateClassModal';
import ManageClassesModal from './components/organisms/ManageClassModal';
import { createClass, createStudent, fetchClasses, fetchStudents } from './utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, LinearProgress, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';


function App() {  
const [openCreateStudentModal, setOpenCreateStudentModal] = useState(false);
const [openCreateClassModal, setOpenCreateClassModal] = useState(false);
const [openManageClassesModal, setOpenManageClassesModal] = useState(false);
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

const handleCreateStudentSubmit = (formData: any) => {
  createStudentMutate(formData);
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

if (isLoading) return (<div>
 <div>Loading students...</div>
 <LinearProgress />
</div>);
if (error) return <Alert severity='error' >Error loading students.</Alert>;

console.log('classes', classes);

  return (
    <>
     <Paper 
        elevation={3} 
        style={{ 
          // padding: '20px', 
          margin: '20px',     
          overflow: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px'
        }}

      >

      <HeaderMenu 
        onCreateStudent={() => setOpenCreateStudentModal(true)} 
        onCreateClass={() => setOpenCreateClassModal(true)} 
        onManageClasses={() => setOpenManageClassesModal(true)}
      />
      </Paper>
      <CreateStudentModal 
      open={openCreateStudentModal} 
      onSubmit={handleCreateStudentSubmit} 
      onClose={() => setOpenCreateStudentModal(false)} 
      classesOptions={classes.map((c: any) => ({ id: c._id, name: c.className }))}
      />
      <CreateClassModal 
        open={openCreateClassModal}
        onSubmit={createClassMutate}
        onClose={() => setOpenCreateClassModal(false)}
      />
      <ManageClassesModal
        open={openManageClassesModal}
        onClose={() => setOpenManageClassesModal(false)}
        classesList={classes.map((c: any) => ({ id: c._id, name: c.className }))}
        onEditClass={(id) => console.log('edit', id)}
        onDeleteClass={(id) => console.log('delete', id)}
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
        <UsersGallery users={students} onEdit={(id) => console.log('edit', id)} onDelete={(id) => console.log('delete', id)}/>    
      </Paper>
    </>
  )
}

export default App
