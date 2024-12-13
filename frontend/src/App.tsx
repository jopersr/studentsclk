import { useState, useEffect } from 'react';
import './App.css'
import HeaderMenu from './components/organisms/HeaderMenu';
import UsersGallery from './components/organisms/UserGallery';
import ClassFormModal from './components/organisms/ClassFormModal';
import ManageClassesModal from './components/organisms/ManageClassModal';
import { createClass, createStudent, deleteClass, deleteStudent, fetchClasses, fetchStudents, updateClass, updateStudent } from './utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Grid2, LinearProgress, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Class, ClassFormData, StudentFormData } from './utils/types';
import ConfirmDialog from './components/molecules/ConfirmDialog';
import { ConfirmDialogProps } from './components/molecules/ConfirmDialog/types';
import StudentFormModal from './components/organisms/StudentFormModal';
import OneContainer from './components/atoms/OneConteiner';
import EmptyState from './components/molecules/EmptyState';
import UserCardSkeleton from './components/molecules/UserCardSkeleton';
import UserSkeletonGallery from './components/organisms/UserSkeletonGallery';

function App() {  
  const [openCreateStudentModal, setOpenCreateStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<null | StudentFormData>(null);
  
  const [openManageClassesModal, setOpenManageClassesModal] = useState(false);
  const [openEditClassModal, setOpenEditClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [confirmDialogState, setConfirmDialogState] = useState<ConfirmDialogProps>({ open: false, onConfirm: () => {}, onClose: () => {}, title: '', message: '' });
  
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: students, error, isLoading } = useQuery({ queryKey: ['students'], queryFn: fetchStudents });
  const { data: classes, error: classesError, isLoading: isLoadingClasses } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses
  });

  // Mutations for Students
  const { mutate: createStudentMutate } = useMutation({
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

  const { mutate: updateStudentMutate } = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {    
      queryClient.invalidateQueries({ queryKey: ['students'] });    
      setOpenCreateStudentModal(false);
      enqueueSnackbar('Student updated successfully.', { variant: 'success' });
    },
    onError: (err) => {
      console.error('Error updating student:', err);    
      enqueueSnackbar('Failed to update student. Please try again.', { variant: 'error' });
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

  // Mutations for Classes
  const { mutate: createClassMutate } = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });      
      enqueueSnackbar('Class created successfully.', { variant: 'success' });
    },
    onError: (err) => {
      console.error('Error creating class:', err);
      enqueueSnackbar('Failed to create class. Please try again.', { variant: 'error' });
    }
  });

  const { mutate: updateClassMutate } = useMutation({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
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

  // Handle Queries Errors with Toast
  useEffect(() => {
    if (error) {
      console.error('Error fetching students:', error);
      enqueueSnackbar('Failed to load students. Please try again.', { variant: 'error' });
    }
    if (classesError) {
      console.error('Error fetching classes:', classesError);
      enqueueSnackbar('Failed to load classes. Please try again.', { variant: 'error' });
    }
  }, [error, classesError, enqueueSnackbar]);

  // Determine if we are in a loading state globally
  const isGlobalLoading = isLoading || isLoadingClasses ;

  // Handlers Students
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

  const handleConfirmStudentDelete = (id : string) => {
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

  // Handlers Classes
  const handleCreateClass = () => {
    setEditingClass(null);
    setOpenEditClassModal(true);
  }

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
    setOpenEditClassModal(false);
  };

  const handleConfirmClassDelete = (id: string) => {
    if (id) {
      deleteClassMutate(id);
    }
    setConfirmDialogState((prev) => { return { ...prev, open: false }});
  };

  const handleClassDeleteClick = (id: string) => {
    setConfirmDialogState({
      open: true,
      onConfirm: () => handleConfirmClassDelete(id),
      onClose: handleCancelDelete,
      title:"Delete Class",
      message:"This action is irreversible. Are you sure you want to delete this class?"
    });
  };

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
          onCreateClass={handleCreateClass} 
          onManageClasses={() => setOpenManageClassesModal(true)}
        />
         {isGlobalLoading && <LinearProgress />}
      </Paper>
      <StudentFormModal 
        open={openCreateStudentModal} 
        onSubmit={handleStudentSubmit} 
        onClose={() => setOpenCreateStudentModal(false)} 
        classesOptions={(classes || []).map((c: Class) => ({ id: c._id, name: c.className }))}
        student={editingStudent}
      />   

      <ClassFormModal
        open={openEditClassModal}
        onClose={() => setOpenEditClassModal(false)}
        onSubmit={handleClassSubmit}
        classData={editingClass}
      />    

      <ManageClassesModal
        open={openManageClassesModal}
        onClose={() => setOpenManageClassesModal(false)}
        classesList={classes || []}
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
        {
          isGlobalLoading ?
           <UserSkeletonGallery />
           :
            students && students.length > 0?
                <UsersGallery 
                  users={students || []} 
                  onEdit={handleEditStudent} 
                  onDelete={handleStudentDeleteClick} 
                  isLoading={isGlobalLoading}
                />  
              : <OneContainer>
                  <EmptyState 
                    title="No students available" 
                    message="Get started by creating your first student" 
                    onCreateNew={handleCreateStudent}
                  />            
                </OneContainer> 
        }
      </Paper>
    </>
  )
}

export default App
