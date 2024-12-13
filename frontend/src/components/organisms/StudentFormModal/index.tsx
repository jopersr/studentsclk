import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { CreateStudentModalProps } from './types';
import { StudentFormData } from '../../../utils/types';

const StudentFormModal: React.FC<CreateStudentModalProps> = ({
  open,
  onClose,
  onSubmit,
  classesOptions,
  student,
}) => {
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<StudentFormData>({
    defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        classIds: [],
      }
  });

  useEffect(() => {
    if (student) {      
      reset({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        classIds: student.classIds || [],
        id: student.id,
      });
    } else {      
      reset({
        firstName: '',
        lastName: '',
        email: '',
        classIds: []
      });
    }
  }, [student]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: StudentFormData) => {    
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ position: 'relative', paddingRight: '48px' }}>
        <DialogTitle>{`${student ? 'Edit' : 'Create'} student`}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>
        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>          
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant='standard'
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant='standard'
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: { 
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}                
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant='standard'
              />
            )}
          />          
           <Controller
            name="classIds"
            control={control}            
            render={({ field }) => (
              <Autocomplete
                {...field}              
                multiple
                options={classesOptions}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => field.onChange(value.map((v) => v.id))}
                value={classesOptions.filter((co) => field.value.includes(co.id))}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Classes" variant='standard'/>}
            />
          )}
        />
        </Box>
      </DialogContent>      
      <DialogActions >
        <Button onClick={handleClose} color="primary">
          CANCEL
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained" color="primary">
          {student ? 'SAVE' : 'CREATE'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentFormModal;
