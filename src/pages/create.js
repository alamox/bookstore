import {useState} from 'react';
import { useAppContext } from '../store/store';
import Layout from '../components/layout';
import { useNavigate } from 'react-router-dom';

export default function Create(){
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cover, setCover] = useState('');
    const [intro, setIntro] = useState('');
    const [completed, setCompleted] = useState(false);
    const [review, setReview] = useState('');

    const store = useAppContext();
    const navigate = useNavigate();

    const inputStyle = {
        formContainer: {
            width: '400px',
            margin: '0 auto',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            margin: '15px 0',
        },
        title: {
            fontSize: '16px',
            textAlign: 'left',
            color: 'white'

        },
        input: {
            padding: '10px',
            borderRadius: '5px',
            fontSize: '16px',
        },
        buttonStyle: {
            padding: '15px 20px',
            minWidth: '200px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#1e9638',
            color: 'white',
            fontWeigth: 'bolder',
            fontSize: '18px',
        },
    };

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case 'title':
                setTitle(value);
                break;
            case 'author':
                setAuthor(value);
                break;
            case 'intro':
                setIntro(value);
                break;
            case 'completed':
                setCompleted(e.target.checked);
                break;
            case 'review':
                setReview(value);
                break;
            default:
        }
    }

    function handleChangeFile(e){ /*Vamos a procesar una imagen desde el nav*/
        const element = e.target; //El archivo que subimos
        const file = element.files[0]; /*files es el array que sale del input type='file'*/
        const reader = new FileReader(); /*API que permite manipular archivos desde el nav*/

        reader.readAsDataURL(file);

        reader.onloadend = function(){ 
            //este evento se va a ejecutar cuando se pueda leer el archivo
            setCover(reader.result.toString());
        }
    }

    function handleSubmit(e){
        e.preventDefault(); /*Sirve para detener el comportamiento por defecto*/
        const newBook = {
            id: crypto.randomUUID(),
            title, /*Con poner solo title ya hace referencia directa a la prop*/
            author,
            cover,
            intro,
            completed,
            review
        };

        //TODO: mandar a registrar el libro
        store.createItem(newBook); 
        navigate("/");
        
    }


    return (
        <Layout>
            <form onSubmit={handleSubmit} style={inputStyle.formContainer}>
                <div style={inputStyle.container}>
                    <div style={inputStyle.title}>Title (*)</div>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={handleChange} 
                        value={title}
                        style={inputStyle.input}
                        required
                    />
                </div>
                <div style={inputStyle.container}>
                    <div style={inputStyle.title}>Author (*)</div>
                    <input 
                        type="text" 
                        name="author" 
                        onChange={handleChange} 
                        value={author}
                        style={inputStyle.input}
                        required/>
                </div>
                <div style={inputStyle.container}>
                    <div style={inputStyle.title}>Cover</div>
                    <input 
                        type="file" 
                        name="cover" 
                        onChange={handleChangeFile} 
                        style={inputStyle.input}/>
                    <div>{cover ? <img src={cover} width="200" alt="preview"/> : ''}</div>
                </div>
                <div style={inputStyle.container}>
                    <div style={inputStyle.title}>Introduction</div>
                    <input 
                        type="text" 
                        name="intro" 
                        onChange={handleChange} 
                        value={intro}
                        style={inputStyle.input}/>
                </div>
                <div>
                    <div style={inputStyle.title}>Completed</div>
                    <input 
                        type="checkbox" 
                        name="completed" 
                        onChange={handleChange} 
                        value={completed}
                        
                        />
                </div>
                <div style={inputStyle.container}>
                    <div style={inputStyle.title}>Review</div>
                    <input 
                        type="text" 
                        name="review" 
                        onChange={handleChange} 
                        value={review}
                        style={inputStyle.input}/>
                </div>
                <input type="submit" value="Register book" style={inputStyle.buttonStyle} />
            </form>
        </Layout>
    );
}