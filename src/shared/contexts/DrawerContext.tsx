import { createContext, useCallback, useContext, useState } from 'react';


interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

interface IMeuComponentProps {
    children?: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<IMeuComponentProps> = ({ children }) => {
    const [isDrawerOpen, setiIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setiIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
}