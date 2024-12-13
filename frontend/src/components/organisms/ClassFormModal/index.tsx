import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { ClassFormData } from '../../../utils/types';
import { ClassFormModalProps } from './types';

const ClassFormModal: React.FC<ClassFormModalProps> = ({ open, onClose, onSubmit, classData }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ClassFormData>({
    defaultValues: classData ? 
    {
      className: classData.className,
      year: classData.year,
    }
    :{
      className: '',
      year: undefined,
    }
  });

  useEffect(() => {
    if (classData) {
      reset({
        className: classData.className,
        year: classData.year,
      });
    } else {
      reset({
        className: '',
        year: undefined,
      });
    }
  } , [classData]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: ClassFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ position: 'relative', paddingRight: '48px' }}>
        <DialogTitle>{`${classData ? 'Edit' : 'Create'} class`}</DialogTitle>
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
            name="className"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.className}
                helperText={errors.className?.message}
                variant='standard'
              />
            )}
          />
          <Controller
            name="year"
            control={control}
            rules={{
              required: 'Year is required',
              min: { value: 0, message: 'Year must be greater or equal to 0' },
              max: { value: 99, message: 'Year must be less than 100' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Year"
                type="number"
                error={!!errors.year}
                helperText={errors.year?.message}
                variant='standard'
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
          {`${classData ? 'SAVE' : 'CREATE'}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassFormModal;
