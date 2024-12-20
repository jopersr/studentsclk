import { ReactNode } from 'react';

const OneContainer = ({ children }: { children: ReactNode }) => 
  <div  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column'
  }}>
    {children}
</div>;

export default OneContainer;