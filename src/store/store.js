/*Store es una convención de nombres que se asignan a archivos 
que te permitan manejar el estado de tu app*/
import {createContext, useContext, useState} from 'react';

const AppContext = createContext({
    items: [],
    createItem: (item) => {},
    getItem: (id) => {},
    updateItem: (item) => {},
    deleteItem: (item) => {},
}); 

export default function Store({children}){

    const [items, setItems] = useState([]);

    function createItem(item){
        const temp = [...items];
        temp.push(item);
        setItems(temp);
    }

    function getItem(id){
        const item = items.find(item => item.id === id);
        return item;
    }

    function updateItem(item){
        const index = items.findIndex(i => i.id === item.id);
        const temp = [...items];

        if (index !== -1) {
            temp[index] = { ...item }; // Actualiza el libro correspondiente
            setItems(temp); // Actualiza el estado del store
        }
    }

    function deleteItem(item){
        const newItems = [...items];
        const index = newItems.findIndex(i => i.id === item.id);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    return (
        <AppContext.Provider 
            value={{
                items, 
                createItem,
                getItem,
                updateItem,
                deleteItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}