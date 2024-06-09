import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { IconEye, IconEyeClose } from '../../assets/icons';

const AuthForm = ({ auth }) => {
    const authMode = auth.mode === "login" ? "Log In" : "Sign Up";

    return (
        <Form  validated={auth.validated} onSubmit={auth.mode === "login" ? auth.logInHandler : auth.signUpHandler} className='d-flex flex-column justify-content-center align-items-center w-75 gap-3'>
            <h3 className='text-primary fw-bolder fs-2'>{authMode}</h3>
            {auth.mode !== "login" && <Form.Control type="text" value={auth.name} onChange={auth.nameChangeHandler} placeholder="Name" pattern="[A-Za-z ]{4,32}" title={'Must be between 4 to 32 letters, capital or small'} required />}
            <Form.Control type="email" value={auth.email} onChange={auth.emailChangeHandler} placeholder="Email" required />
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Password"
                    type={auth.type}
                    title='Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    value={auth.password}
                    onChange={auth.passwordChangeHandler}
                    aria-label="password"
                    aria-describedby="pw-btn"
                    required
                />
                <Button variant="outline-primary" id="pw-btn" onClick={auth.typeChangeHandler}>
                    {auth.type === 'password' ? <IconEyeClose /> : <IconEye />}
                </Button>
            </InputGroup>
            <Button type="submit" size="lg" variant="primary" className='w-100'>{authMode}</Button>
        </Form>
    );
};

export default AuthForm;

