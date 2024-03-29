import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { allUsersApi, host } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContatcts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContacts, setShowContacts] = useState(false)
  useEffect(()=>{
    const setUserCurrent = async()=>{
        if(!localStorage.getItem('chat-app-user'))
        {
          navigate('/login')
        }
        else{
          setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
          setIsLoaded(true)
        }
    }
    setUserCurrent()
    
  },[navigate])
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user',currentUser._id)
    }
  },[currentUser])
  useEffect(()=>{
    const getCurrentUserContacts = async()=>{
      if(currentUser){
        if(currentUser.isAvatarImagesSet){
          const {data} = await axios.get(`${allUsersApi}/${currentUser._id}`)
          setContatcts(data)
        }else{
          navigate('/setAvatar')
        }
      }
    }
    getCurrentUserContacts()
    
  },[navigate, currentUser])
  const handleChatChange =(chat)=>{
    setCurrentChat(chat)
  }
  const handleShow = ()=> setShowContacts(true)
  const handleClose = ()=> setShowContacts(false)
  return (
    <Container>
      <div className="container">
        <Contacts show = {showContacts} handleCloseContact = {handleClose} contacts = {contacts} currentUser = {currentUser} changeChat = {handleChatChange}/>
        {
          ( isLoaded && currentChat===undefined)?(<Welcome handleShowContact = {handleShow}  user = {currentUser}/>):(<ChatContainer handleShowContact = {handleShow}  chat = {currentChat} currentUser={currentUser} socket = {socket}/>)
        }
        
      </div>
    </Container>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
    @media only screen and (max-width: 720px){
      grid-template-columns: none;
    }

  }
`

export default Chat