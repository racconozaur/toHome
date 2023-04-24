import React, { useState } from 'react'
import Input from '../../utils/input/Input'
import { registration } from '../../actions/user'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/Logo.png'
import {
	HiOutlineMail,
	HiOutlineLockClosed,
	HiOutlineUser,
	HiOutlineDeviceMobile,
} from 'react-icons/hi'

const Registration = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [number, setNumber] = useState('')
	const [name, setName] = useState('')

	const { t } = useTranslation()

	return (
		<div className=' flex justify-center w-full mt-20 drop-shadow-2xl lg:mx-auto lg:container'>
			<div className=' flex flex-col items-center bg-white w-full lg:w-4/12 lg:p-14 px-0 py-14 h-[636px] container rounded-2xl text-lg font-bold'>
				<img src={logo} alt='logo' />
				<div className='  text-cblue my-8'>{t('Registeration')}</div>

				<div className='flex items-center text-lg w-full'>
					<HiOutlineUser
						className='absolute ml-4'
						viewBox='0 0 24 24'
						width='24'
					/>
					<Input
						className='border-cblue rounded-xl '
						value={name}
						setValue={setName}
						type={'email'}
						placeholder={t('Your Name')}
					/>
				</div>

				<div className='flex items-center text-lg w-full my-5'>
					<HiOutlineMail
						className='absolute ml-4'
						viewBox='0 0 24 24'
						width='24'
					/>
					<Input
						className='border-cblue rounded-xl '
						value={email}
						setValue={setEmail}
						type={'email'}
						placeholder={t('Your Email')}
					/>
				</div>

				<div className='flex items-center text-lg w-full'>
					<HiOutlineDeviceMobile
						className='absolute ml-4'
						viewBox='0 0 24 24'
						width='24'
					/>
					<Input
						className='border-cblue rounded-xl '
						value={number}
                        pattern="[0-9]*"
						setValue={setNumber}
						type='number'
						placeholder={t('Your Number')}
					/>
				</div>

				<div className='flex items-center text-lg w-full my-5'>
					<HiOutlineLockClosed
						className='absolute ml-4'
						viewBox='0 0 24 24'
						width='24'
					/>
					<Input
						className='border-cblue rounded-xl '
						value={password}
						setValue={setPassword}
						type={'password'}
						placeholder={t('Your Password')}
					/>
				</div>

				<button
					className='w-full bg-cyellow p-3 rounded-xl mt-5 hover:cursor-pointer my-5'
					onClick={() => registration(email, password, number, name)}
				>
					{t('Registeration')}
				</button>
			</div>
		</div>
	)
}

export default Registration
