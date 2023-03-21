import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {BsFillMoonStarsFill} from 'react-icons/bs'
import { useTranslation } from 'react-i18next';
import useLocalstorage from '../../hooks/use-localstorage';
import i18n from '../../i18n';
import logo from '../../assets/Logo.png'

const Navbar = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [language, setLanguage] = useLocalstorage('language', 'ru')
    const [changeLang, setChangeLang] = useState(true)

    const handleLenguageChange = () => {
        i18n.changeLanguage('ru');
        setLanguage('ru');
        setChangeLang(false)
    };

    const handleLenguageChangeEn = () => {
        i18n.changeLanguage('en');
        setLanguage('en');
        setChangeLang(true)
    }

    return (
        <header className='bg-cyellow h-[70px] w-full flex items-center z-40 fixed top-0'>
            <nav className='flex justify-between items-center container mx-auto px-4 lg:px-0'>

                <NavLink
                    to='/'
                >
                    <img src={logo} alt='logo' />
                </NavLink>

                <ul className='flex text-[20px]'>
                    <li className=''>
                        {!isAuth && 
                            <NavLink
                                activeClassName=' text-white'
                                className=' hover:opacity-75 mr-5 lg:mr-16'
                                to='/login'
                            >
                                {t('Log-In')}
                            </NavLink>
                        }
                    </li>
                    <li className='nav-item'>
                        {!isAuth && 
                            <NavLink
                                activeClassName=' text-white'
                                className='hover:opacity-75 mr-16'
                                to='/registration'
                            >
                                {t('Registeration')}
                            </NavLink>
                        }
                    </li>
                    <li className='nav-item'>
                        {isAuth && 
                            <NavLink
                                activeClassName=' text-white'
                                className=' hover:opacity-75 hover:cursor-pointer mr-16'
                                to={`/user`}
                            >
                                {localStorage.getItem('user')}
                            </NavLink>
                        }
                    </li>
                    <li className='nav-item'>
                        {isAuth && <div
                            className='hover:opacity-75 hover:cursor-pointer mr-16'
                            onClick={() => dispatch(logout()) }
                        >
                            {t('Exit')}
                        </div>}
                    </li>
                    <li className=' mr-7 flex items-center'>
                        <BsFillMoonStarsFill className=' cursor-pointer text-xl dark:text-slate-50' onClick={props.onDark}/>
                    </li>
                    {
                        changeLang
                        ?
                    
                        <li className='  dark:text-white'>
                            <button onClick={handleLenguageChange} className='uppercase'>
                                ru
                            </button>
                        </li>
                        :
                        <li className=' dark:text-white'>
                            <button onClick={handleLenguageChangeEn} className='uppercase'>
                                
                                en
                            </button>
                        </li>
                    }
                </ul>

            </nav>
        </header>
    );
};

export default Navbar;
