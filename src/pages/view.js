import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import { useAppContext } from "../store/store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function View(){
    const [item, setItem ] = useState(null);
    const params = useParams();
    const store = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const book = store.getItem(params.bookId);
        setItem(book);
    }, [])

    const itemStyles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap', // Permitir saltos de línea
            gap: '20px',
            color: 'white',
            width: '800px',
            margin: '0 auto',
        },
        contentWrapper: {
            display: 'flex',
            gap: '20px',
            flex: '1 1 auto', // Asegura que los hijos ocupen el espacio disponible
        },
        buttonWrapper: {
            width: '100%', // Ocupa toda la línea
        },
        buttonStyle: {
            display: 'block', // Forzar bloque
            padding: '15px 20px',
            minWidth: '200px',
            width: '100%', // Botón a toda la línea del contenedor
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '18px',
        },
    };

    function handleClick(){
        const tempItem = item;
        store.deleteItem(tempItem);
        navigate('/');
    }
    
    if(!item){
        return <Layout>Item not found</Layout>
    }
    
    return (
        <Layout>
        <div style={itemStyles.container}>
            <div style={itemStyles.contentWrapper}>
                <div>
                    {item?.cover ? <img src={item.cover} width="400" /> : ''}
                </div>
                <div>
                    <h2>{item?.title}</h2>
                    <div>{item?.author}</div>
                    <div>{item?.intro}</div>
                    <div>{item?.completed ? 'Leído' : 'Por terminar'}</div>
                    <div>{item?.review}</div>
                </div>
            </div>
            <div style={itemStyles.buttonWrapper}>
                <button onClick={handleClick} style={itemStyles.buttonStyle}>Eliminar libro</button>
            </div>
        </div>
    </Layout>
    
    );
}