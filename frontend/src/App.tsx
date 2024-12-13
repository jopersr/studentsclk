import { useState } from 'react';
import './App.css'
import CreateStudentModal from './components/organisms/StudentFormModal';
import HeaderMenu from './components/organisms/HeaderMenu';
import UsersGallery from './components/organisms/UserGallery';
import CreateClassModal from './components/organisms/ClassFormModal';
import ManageClassesModal from './components/organisms/ManageClassModal';
import { createClass, createStudent, deleteClass, deleteStudent, fetchClasses, fetchStudents, updateClass, updateStudent } from './utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, LinearProgress, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Class, ClassFormData, StudentFormData } from './utils/types';
import ConfirmDialog from './components/molecules/ConfirmDialog';
import ClassFormModal from './components/organisms/ClassFormModal';
import { ConfirmDialogProps } from './components/molecules/ConfirmDialog/types';
import OneContainer from './components/atoms/OneConteiner';


function App() {  
const [openCreateStudentModal, setOpenCreateStudentModal] = useState(false);
const [editingStudent, setEditingStudent] = useState<null | StudentFormData>(null);
const [openCreateClassModal, setOpenCreateClassModal] = useState(false);
const [openManageClassesModal, setOpenManageClassesModal] = useState(false);
const [openEditClassModal, setOpenEditClassModal] = useState(false);
const [editingClass, setEditingClass] = useState<Class | null>(null);
const [confirmDialogState, setConfirmDialogState] = useState<ConfirmDialogProps>({ open: false, onConfirm: () => {}, onClose: () => {}, title: '', message: '' });
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

const { mutate: updateClassMutate } = useMutation({
  mutationFn: updateClass,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['classes']});
    enqueueSnackbar('Class updated successfully.', { variant: 'success' });
    setOpenEditClassModal(false);
  },
  onError: (err) => {
    console.error('Error updating class:', err);
    enqueueSnackbar('Failed to update class. Please try again.', { variant: 'error' });
  }
});

const { mutate: deleteClassMutate } = useMutation({
  mutationFn: deleteClass, 
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['classes']});
    enqueueSnackbar('Class deleted successfully.', { variant: 'success' });
  },
  onError: (err) => {
    console.error('Error deleting class:', err);
    enqueueSnackbar('Failed to delete class. Please try again.', { variant: 'error' });
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
    updateStudentMutate({ id: editingStudent.id, data });
  } else {    
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

const handleConfirmStudentDelete = ( id : string) => {
  console.log('confirm delete', id);
  if (id) {
    deleteStudentMutate(id);
  }  
  setConfirmDialogState((prev)=> {return { ...prev, open: false }});  
};


const handleStudentDeleteClick = (id: string) => {  
  setConfirmDialogState({
    open: true,
    onConfirm: () => handleConfirmStudentDelete(id),
    onClose: handleCancelDelete,
    title:"Delete Student",
    message:"This action is irreversible. Are you sure you want to delete this student?"
  });
};

const handleCancelDelete = () => {
  setConfirmDialogState((prev) => {return { ...prev, open: false }});  
};

const handleEditClassClick = (cls: Class) => {
  setEditingClass(cls);
  setOpenEditClassModal(true);
};

const handleClassSubmit = (data: ClassFormData) => {  
  if (editingClass) {
    updateClassMutate({ id: editingClass._id, data });
  } else {
    createClassMutate(data);
  }
};

const handleConfirmClassDelete = (id: string) => {
  if (id) {
    deleteClassMutate(id);
  }
  setConfirmDialogState((prev) => { return { ...prev, open: false }});
}

const handleClassDeleteClick = (id: string) => {
  setConfirmDialogState({
    open: true,
    onConfirm: () => handleConfirmClassDelete(id),
    onClose: handleCancelDelete,
    title:"Delete Class",
    message:"This action is irreversible. Are you sure you want to delete this class?"
  });
}

if (isLoading ) return (
  <OneContainer>
    <div>
      <div>Loading students...</div>
      <LinearProgress />
    </div>
  </OneContainer>
);

if (error) return (
  <OneContainer>
    <Alert severity='error'>      
      The system is currently experiencing issues. 
      <br />
      Please try again later.
    </Alert>
  </OneContainer>
) 

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
      <ClassFormModal
        open={openEditClassModal}
        onClose={() => setOpenEditClassModal(false)}
        onSubmit={handleClassSubmit}
        classData={editingClass}
      />   
      <CreateClassModal 
        open={openCreateClassModal}
        onSubmit={createClassMutate}
        onClose={() => setOpenCreateClassModal(false)}
      />
      <ManageClassesModal
        open={openManageClassesModal}
        onClose={() => setOpenManageClassesModal(false)}
        classesList={classes}
        onEditClass={handleEditClassClick}
        onDeleteClass={handleClassDeleteClick}
      />
       <ConfirmDialog {...confirmDialogState}/>
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
        <UsersGallery users={students} onEdit={handleEditStudent} onDelete={handleStudentDeleteClick}/>    
      </Paper>
    </>
  )
}

export default App
