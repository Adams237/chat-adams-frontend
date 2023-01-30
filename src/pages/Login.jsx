import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/e363e38ceffaece60e00b87ee4286e08.gif'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { LoginAPI } from '../utils/APIRoutes'


function Login() {

    const navigate = useNavigate()
    const [values, setValue] = useState({
        email:'',
        password:'',
    })
    const toastTheme = {
        position: "top-center",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }
    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate("/")
      }
    },[navigate])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(validation()){
            const { email, password } = values
            const {data} = await axios.post(LoginAPI,{
                email,
                password,
            })
            if(data.status === false){
                toast.error(data.error, toastTheme)
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }
        }
    }
    const validation = ()=>{
        const { email, password } = values
        if (password.length === 0){
            toast.error('email et mot de passe requis', toastTheme)
            return false
        }
        else if ( email === ""){
            toast.error('email et mot de passe requis', toastTheme)
            return false
        }
        return true
    }
    const handleChange = (e)=>{
        setValue({...values, [e.target.name]: e.target.value})
    }
  return (
    <>
        <FormConatainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h1>chat-Adams</h1>
                </div>
                <input type="email" placeholder='votre email' name='email' onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder='votre mot de passe' name='password' onChange={(e)=>handleChange(e)}/>
                <button type='submit'>Connexion</button>
                <span>n'avez-vous pas de compte? <Link to="/register">S'enregistrer</Link></span>
            </form>
        </FormConatainer>
        <ToastContainer/>
    </>
  )
}

const FormConatainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:1rem;
    align-items: center;
    background-color: #fff;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-transform: none;
                font-weight: bold;
            }
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: #997af0;
            color: white;
            padding:1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-transform: non;
                font-weight: bold;
            }
        }
    }
`;

export default Login