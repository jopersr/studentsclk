import { Box, Typography, Button, Paper } from '@mui/material'
import { School, PersonAdd } from '@mui/icons-material'
import { EmptyStateProps } from './types'


const EmptyState = ({ 
  title = 'No students available',
  message = 'Get started by creating your first student',
  onCreateNew 
}: EmptyStateProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'background.default',
        borderRadius: 2,
        minHeight: '200px',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <School
          sx={{
            fontSize: 40,
            color: 'primary.main'
          }}
        />
      </Box>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 'medium',
          textAlign: 'center',
          color: 'text.primary'
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          maxWidth: '400px',
          mb: 2
        }}
      >
        {message}
      </Typography>
      {onCreateNew && (
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={onCreateNew}
          sx={{
            mt: 2,
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Create New Student
        </Button>
      )}
    </Paper>
  )
}

export default EmptyState;