import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/Logo.png'
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory();

    const {t} = useTranslation()

    const submitHandler = () => {
        if(email.trim() === '' || password.trim() === ''){
            alert('Fields are empty')
        }
        else{
            dispatch(login(email, password))
            localStorage.setItem("user", email);

            setTimeout(() => {
                history.push("/all/posts");
            }, 500)
        }
        
    }

    return (
        <div className=' flex justify-center w-full mt-20 drop-shadow-2xl lg:mx-auto lg:container'>
            <div className=' flex flex-col items-center bg-white w-full lg:w-4/12 lg:p-14 px-4 py-14 h-[636px] container rounded-2xl text-lg font-bold'>
                <img src={logo} alt='logo' />
                <div className="  text-cblue my-8">{t('Log-In')}</div>

                <div className="flex items-center text-lg w-full">
                    <HiOutlineMail className="absolute ml-4" viewBox="0 0 24 24" width="24"/>
                    <Input
                        className="border-cblue rounded-xl " 
                        value={email}
                        setValue={setEmail}
                        type={'email'}
                        placeholder={t('Your Email')}
                    />
                </div>

                <div className="flex items-center text-lg w-full my-5">
                    <HiOutlineLockClosed className="absolute ml-4" viewBox="0 0 24 24" width="24"/>
                    <Input
                        className="border-cblue rounded-xl " 
                        value={password}
                        setValue={setPassword}
                        type={'password'}
                        placeholder={t('Your Password')}
                    />
                </div>

                <button 
                    className='w-full bg-cyellow p-3 rounded-xl mt-5 hover:cursor-pointer my-5'
                    onClick={submitHandler}
                >
                    {t('Log-In')}
                </button>
            </div> 
        </div>
    );
};

export default Login;
