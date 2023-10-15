import React, { createContext, useContext, useState } from 'react';
import { ActiveType } from '../model/IMovie';

interface IActiveContext {
  active: ActiveType,
  setActive: React.Dispatch<React.SetStateAction<ActiveType>>
}

const ActiveContext = createContext<IActiveContext | undefined>(undefined);

function ActiveProvider({ children }: { children: React.ReactElement }) {
  const [active, setActive] = useState<ActiveType>('list');

  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
}

const useActive = () => {
  const context = useContext(ActiveContext);

  if (context === undefined) throw new Error('Active context is not avalible.')
  return context;
}

export { ActiveProvider, useActive };
