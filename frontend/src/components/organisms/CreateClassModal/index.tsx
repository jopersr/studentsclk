import React from 'react';
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

interface CreateClassFormData {
  name: string;
  year: number;
}

interface CreateClassModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClassFormData) => void;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateClassFormData>({
    defaultValues: {
      className: '',
      year: undefined,
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: CreateClassFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ position: 'relative', paddingRight: '48px' }}>
        <DialogTitle>Create class</DialogTitle>
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
          {/* Class Name */}
          <Controller
            name="className"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                variant='standard'
              />
            )}
          />

          {/* Year */}
          <Controller
            name="year"
            control={control}
            rules={{
              required: 'Year is required',
              min: { value: 1900, message: 'Year must be greater or equal to 1900' },              
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
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClassModal;
