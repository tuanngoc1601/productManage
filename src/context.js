import React from 'react';
import { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    return (
        <AppContext.Provider 
            value={{
                loading,
                setLoading,
                searchText,
                setSearchText,
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }