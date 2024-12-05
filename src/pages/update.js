
import Layout from '../components/layout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../store/store';


export default function Update({items}){

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

    const { state } = useLocation(); // Recuperar datos pasados por navigate
    const { bookId } = useParams(); // Recuperar ID desde la URL
    const store = useAppContext();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      title: "",
      author: "",
      cover: "",
      intro: "",
      completed: false,
      review: "",
    });
  
    useEffect(() => {
      if (state?.item) {
        // Si los datos se pasaron desde View
        setFormData(state.item);
      } else {
        // Si no, buscar en el store
        const book = store.getItem(bookId);
        if (book) {
          setFormData(book);
        }
      }
    }, [state, bookId, store]);
  
    function handleChange(e) {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  
    function handleChangeFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, cover: reader.result.toString() });
      };
    }
  
    function handleSubmit(e) {
        e.preventDefault();
        store.updateItem(formData); // Actualizamos en el contexto
        navigate(`/view/${bookId}`); // Volvemos a la página del libro
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
            value={formData.title}
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
            value={formData.author}
            style={inputStyle.input}
            required
          />
        </div>
        <div style={inputStyle.container}>
          <div style={inputStyle.title}>Cover</div>
          <input
            type="file"
            name="cover"
            onChange={handleChangeFile}
            style={inputStyle.input}
          />
          <div>
            {formData.cover ? <img src={formData.cover} width="200" alt="preview" /> : ""}
          </div>
        </div>
        <div style={inputStyle.container}>
          <div style={inputStyle.title}>Introduction</div>
          <input
            type="text"
            name="intro"
            onChange={handleChange}
            value={formData.intro}
            style={inputStyle.input}
          />
        </div>
        <div>
          <div style={inputStyle.title}>Completed</div>
          <input
            type="checkbox"
            name="completed"
            onChange={handleChange}
            checked={formData.completed}
          />
        </div>
        <div style={inputStyle.container}>
          <div style={inputStyle.title}>Review</div>
          <input
            type="text"
            name="review"
            onChange={handleChange}
            value={formData.review}
            style={inputStyle.input}
          />
        </div>
        <input type="submit" value="Update Book" style={inputStyle.buttonStyle} />
      </form>
    </Layout>
    );
}