import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import Logout from './Logout'
import axios from 'axios'
import { getAllMsgApi, sendMsgApi } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid'

function ChatContainer({chat, currentUser, socket}) {
    const [messages, setMessages] = useState([])
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const scrollRef = useRef()
    useEffect(()=>{
        const getAll= async()=>{
             if(currentUser){
            const {data} = await axios.post(getAllMsgApi,{
            from: currentUser._id,
            to:chat._id
        })
        setMessages(data)
        }
        }
        getAll()
       
        
    },[chat, currentUser])
    const handleSendMsg = async(msg)=>{
        await axios.post(sendMsgApi,{
            from: currentUser._id,
            to: chat._id,
            message:msg
        })
        socket.current.emit('send-msg',{
            from: currentUser._id,
            to: chat._id,
            message: msg
        })


        const msgs = [...messages]
        msgs.push({fromSelf:true, message:msg})
        setMessages(msgs)
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMsg({fromSelf:false,message:msg})
            })
        }
    },[socket])

    useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg])
    },[arrivalMsg])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])
  return (
    <>
    {
        chat && ( <Container>
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${chat.avatarImage}`} alt="avatar" />
                                </div>
                                <div className="username">
                                    <h3>{chat.userName}</h3>
                                </div>
                            </div>
                            <Logout/>
                        </div>
                        <div className="chat-messages">
                            {
                                messages.map((message)=>{
                                    return(
                                        <div key={uuidv4()} ref={scrollRef}>
                                            <div className={`message ${message.fromSelf ? "sended":"recieved"}`}>
                                                <div className="content">
                                                    <p>
                                                        {console.log(message.fromSelf)}
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMsg = {handleSendMsg}/>
                    </Container>
                )
    }
   
    </>
  )
}

const Container = styled.div`
    padding-top: 1em;
    display: grid;
    grid-template-rows:10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-template-columns: 15% 70% 15%;
      }
    .chat-header{
        display: felx;
        justify-content: space-between;
        align-items: center; 
        padding: 0 2rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        displey: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffffff39;
                width:0.1rem;
                border-radius: 1rem;

            }
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                maw-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1; 
            }            
        }
        .sended {
            justify-content: flex-end;
            .content{
                background-color: #4f04ff21;
            }
        }
        .recieved {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }

`


export default ChatContainer