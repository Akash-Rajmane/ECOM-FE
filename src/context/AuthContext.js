import React, { createContext, useReducer, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from './CartContext';

const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
    tokenExpirationDate: null
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                token: action.payload.token,
                tokenExpirationDate: action.payload.tokenExpirationDate
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                token: null,
                tokenExpirationDate: null
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const {setCart} = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExpirationDate = new Date(localStorage.getItem('tokenExpirationDate'));
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && token && new Date() < tokenExpirationDate) {
            dispatch({ type: 'LOGIN', payload: { user, token, tokenExpirationDate } });
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpirationDate');
            localStorage.removeItem('user');
        }
    }, []);

    const logout = useCallback(() => {
       
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationDate');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        
        const payload = { items:[], totalAmount:0 }
        setCart(payload);
        
        navigate("/auth");

    }, []);

    useEffect(() => {
        const scheduleLogout = () => {
            if (state.tokenExpirationDate) {
                const remainingTime = new Date(state.tokenExpirationDate).getTime() - new Date().getTime();
                const logoutTimer = setTimeout(() => {
                    logout();
                    toast.info('Session expired. Please log in again.',{
                        toastId: 'info1',
                    });
                }, remainingTime);

                return () => clearTimeout(logoutTimer);
            }
        };

        scheduleLogout();
    }, [state.tokenExpirationDate, logout]);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            //console.log(res);
            if (res.ok) {

                const data = await res.json();
                const token = data.token;
                const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
                const user = data.user;

                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpirationDate', tokenExpirationDate);
                localStorage.setItem('user', JSON.stringify(user));

                dispatch({ type: 'LOGIN', payload: { user, token, tokenExpirationDate } });
                toast.success("You have logged in successfully!");
                navigate("/");
            }

        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                const token = data.token;
                const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
                const user = data.user;

                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpirationDate', tokenExpirationDate);
                localStorage.setItem('user', JSON.stringify(user));

                dispatch({ type: 'LOGIN', payload: { user, token, tokenExpirationDate } });
                toast.success("You have signed up successfully!");
                navigate("/");
            }

        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user: state.user, isAuthenticated: state.isAuthenticated, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

