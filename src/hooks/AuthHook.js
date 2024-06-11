import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';


const useAuth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState("login");
    const [type, setType] = useState('password');
    const { login, signup } = useContext(AuthContext);

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const modeChangeHandler = () => {
        setMode(prevMode => prevMode === "login" ? "signup" : "login");
    };

    const typeChangeHandler = () => {
        setType(prevType => prevType === "password" ? "text" : "password");
    };

    const signUpHandler = async (e) => {
        e.preventDefault();
        await signup(name, email, password);
    };

    const logInHandler = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return {
        name, nameChangeHandler, email, emailChangeHandler, password, passwordChangeHandler, mode, modeChangeHandler, type, typeChangeHandler, signUpHandler, logInHandler
    };
};

export default useAuth;
