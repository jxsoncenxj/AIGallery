import {Layout} from "~/components/layout"
import {FormField} from "~/components/form-field"
import { useState, useEffect, useRef } from 'react'
import { ActionFunction, json } from "@remix-run/node";
import { validateEmail, validatePassword, validateName, validateUsername } from "~/utils/validators.server";
import { login, register } from "~/utils/auth.server";
import { useActionData } from "@remix-run/react";
import { Navbar } from "../components/Navbar";



export const action: ActionFunction = async({request}) => {
  const form = await request.formData()
  const action = form.get('_action')
  const email = form.get('email')
  const password = form.get('password')
  let firstName = form.get('firstName')
  let lastName = form.get('lastName')
  const username = form.get('username')
  let phoneNumber = form.get('phoneNumber')

  

  if (typeof action !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string' || typeof phoneNumber !== 'string') {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }

  if (action === 'register' && (typeof firstName !== 'string' || typeof lastName !== 'string')) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    username: validateUsername(username),
    ...(action === 'register'
      ? {
          firstName: validateName((firstName as string) || ''),
          lastName: validateName((lastName as string) || ''),
        }
      : {}),
  }

  if (Object.values(errors).some(Boolean))
    return json({ errors, fields: { email, password, firstName, lastName, phoneNumber, username }, form: action }, { status: 400 })

    switch (action) {
      case 'login': {
          return await login({ email, password })
      }
      case 'register': {
          firstName = firstName as string
          lastName = lastName as string
          return await register({ email, password, firstName, lastName, phoneNumber, username  })
      }
      default:
          return json({ error: `Invalid Form Data` }, { status: 400 });
    }
  
}

export default function Login() {

  const actionData = useActionData()
  const [formError, setFormError] = useState(actionData?.error || '')
  const [errors, setErrors] = useState(actionData?.errors || {})
  const firstLoad = useRef(true);

  const [action,setAction] = useState('login');

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password ||'',
    firstName:actionData?.fields?.firstName || '',
    lastName:actionData?.fields?.lastName || '',
    username:actionData?.fields?.username ||'',
    phoneNumber: actionData?.fields?.phoneNumber ||'',
  })

  // Updates the form data when an input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ 
      ...form, 
      [field]: event.target.value }))
  }
  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        username:'',
        phoneNumber:'',
      }
      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [action])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('')
    }
  }, [formData])

  useEffect(() => { firstLoad.current = false }, [])



  return (
    <Layout>
    <Navbar/>
      <div className="h-full justify-center items-center flex flex-col gap-y-4">
        <button onClick={() => setAction(action == 'login' ? 'register' : 'login')} 
        className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
          {action === 'login' ? 'Sign up' : 'Sign In'}
        </button>
        <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to A.I. Gallery</h2>
        <p className="font-semibold text-slate-300">{
          action === 'login' ? 'Please Log In to view your account' : 'Sign up to Buy Art' }
        </p>

        <form method="POST" className="underline rounded-2xl bg-gray-200 p-6 w-96">
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{formError}</div>
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={e => handleInputChange(e, 'email')}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={e => handleInputChange(e, 'password')}
            error={errors.password}
          />
          {action != 'login' ? 
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={e => handleInputChange(e, 'firstName')}
                value={formData.firstName}
                error={errors.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={e => handleInputChange(e, 'lastName')}
                value={formData.lastName}
                error={errors.lastName}
              />
              <FormField
            htmlFor="username"
            label="Username"
            value={formData.username}
            onChange={e => handleInputChange(e, 'username')}
            error={errors.username}
          />
                    <FormField
            htmlFor="phoneNumber"
            label="PhoneNumber"
            value={formData.phoneNumber}
            onChange={e => handleInputChange(e, 'phoneNumber')}
            error={errors.phoneNumber}
          />
            </>
           : null
        }
          <div className="w-full text-center">
            <button
              type="submit" name="_action" value={action}
              className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
              {action === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
