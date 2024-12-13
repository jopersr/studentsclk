import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
         <App />
      </SnackbarProvider>
     </QueryClientProvider>
  </StrictMode>,
)
