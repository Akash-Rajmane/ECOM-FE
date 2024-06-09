import React from 'react';
import AuthForm from "../components/auth/AuthForm";
import AuthImage from '../components/auth/AuthImage';
import Logo from '../components/logo/Logo';
import useAuth from '../hooks/AuthHook';

const Auth = () => {
    const auth = useAuth();
    

    return (
        <div className='d-flex justify-content-center align-items-center m-4' style={{height:"85vh"}}>
            <div className='d-flex flex-row border w-75 rounded-3 bg-light-subtle shadow p-4'>
                <section className='d-none d-sm-block col-sm-6'>
                    <AuthImage mode={auth.mode}/>
                </section>
                <section className='d-sm-flex justify-content-center align-items-center flex-sm-column gap-4 col-sm-6 d-flex flex-column col-12'>
                    <Logo size={"60"} fontSize={"40px"} />
                    <AuthForm auth={auth}/>
                    <p>{auth.mode==="login" ? "Not a registered user?" : "Already existing user?"}<span  className='text-primary fs-5 fw-bold' onClick={auth.modeChangeHandler}>{" "}{auth.mode!=="login"?"Log In":"Sign Up"}</span></p>
                </section>
            </div>
        </div>
    )
}

export default Auth;