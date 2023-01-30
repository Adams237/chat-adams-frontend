import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { SetAvatarApi } from '../utils/APIRoutes'
import { Buffer } from 'buffer'

function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsloadind] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const toastTheme = {
        position: "top-center",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login")
          }
    })
    const setProfil = async()=>{
        if(selectedAvatar === undefined){
            toast.error("s'il vous plait choisissez un avatar", toastTheme)
        }
        else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            const {data} = await axios.post(`${SetAvatarApi}/${user._id}`,{
                image: avatars[selectedAvatar]
            })
            if(data.isSet){
                user.isAvatarImagesSet = true
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate("/")
            }else{
                toast.error("erreur du chargement de l'image, s'il vous plai essayer à nouveau", toastTheme)
            }
        }
    }
    useEffect(()=>{
        const getAvatar = async ()=>{
            const data = []
        for(let i=0; i<4; i++){
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
            const buffer = new Buffer(image.data)
            data.push(buffer.toString("base64"))
        }
        setAvatars(data)
        setIsloadind(false)
        }
        getAvatar()
        
       
    },[])
  return (
    <>
    {
        isLoading? <Container>
            <img src={loader} alt="loader" className='loader' />
        </Container>:(
            <Container>
                <div className="title-container">
                    <h1>Photo de profil</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index)=>{
                            return(
                                <div key={index} className={`avatar ${selectedAvatar === index?"selected":""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)} />
                                </div>
                            )
                        })
                    }
                </div>
                <button className='submit-btn' onClick={setProfil}>Choisir la photo</button>
            </Container>
        )
    }
        
        <ToastContainer/>
    </>
  )
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size:100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            paddin: 0.4;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
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
`


export default SetAvatar