import { createContext, useState } from 'react';
import axios from 'axios';
import { useDisclosure, useToast } from '@chakra-ui/react';
export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  //fil update wala fil edide il draw tahltte kifkif donc nista3mlha houni 5iiir 
  const { isOpen, onOpen, onClose } = useDisclosure();
  //tost hiya messag ed errur
  const toast = useToast();
  const FetchUsers = () => {
    axios
      .get('/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Search = (query) => {
    axios
      .post(`/api/users/search?key=${query}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Delete = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        setUsers(users.filter((u) => u._id != id));
        toast({
          title: 'User Deleted',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Add = (form, setForm) => {
    axios
      .post('/api/users', form)
      .then((res) => {
        setUsers([...users, res.data]);
        toast({
          title: 'User Added',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  const FindOne = async (id) => {
    await axios
      .get(`/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
        
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };


  const Update = (form, setForm, id) => {
    // Supprimer les champs inutiles
    const cleanForm = { ...form };
    delete cleanForm._id; // L'ID est dans l'URL, pas besoin dans le body
    delete cleanForm.__v; // Supprime la version Mongoose
    cleanForm.age = Number(cleanForm.age); // Convertir age en number
  
    console.log("Data being sent:", cleanForm); // Vérifier les données nettoyées
  
    axios
      .put(`/api/users/${id}`, cleanForm)
      .then((res) => {
        toast({
          title: 'User Updated',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        FetchUsers();
      })
      .catch((err) => {
        console.error("Error response:", err.response);
        setErrors(err.response?.data?.error || {});
      });
  };
  
  

  // const Update = (form, setForm, id) => {
  //   axios
  //     .put(`/api/users/${id}`, form)
  //     .then((res) => {
  //       toast({
  //         title: 'User Updated',
  //         status: 'success',
  //         duration: 4000,
  //         isClosable: true,
  //       });
  //       setErrors({});
  //       setForm({});
  //       onClose();
  //       FetchUsers();
  //     })
  //     .catch((err) => {
  //       setErrors(err.response.data.error);
  //     });
  // };
  return (
    <GlobalContext.Provider
      value={{
        FetchUsers,
        Search,
        Delete,
        Add,
        FindOne,
        Update,
        users,
        onOpen,
        isOpen,
        onClose,
        errors,
        setErrors,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}