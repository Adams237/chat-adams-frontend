import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Offcanvas from 'react-bootstrap/Offcanvas';

import logo from '../assets/e363e38ceffaece60e00b87ee4286e08.gif'

function Contacts({ contacts, currentUser, changeChat, show, handleCloseContact }) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    const [whidth, setWhidth] = useState(window.innerHeight)
    useEffect(() => {
        setWhidth(window.innerWidth)
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.userName)
        }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return <>

        {
            currentUserImage && currentUserName && (

               whidth < 720 ? (
                <Offcanvas show={show} onHide={handleCloseContact} style={{width: '300px', height:'90%', marginTop: "50px", opacity:'0.9'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Contacts</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Container>
                        <div className="brand">
                            <img src={logo} alt='logo' />
                            <h3>chat-adams</h3>
                        </div>
                        <div className="contacts">
                            {contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => {
                                        changeCurrentChat(index, contact)
                                        handleCloseContact()
                                    }}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.userName}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
               ):(
                <Container>
                        <div className="brand">
                            <img src={logo} alt='logo' />
                            <h3>chat-adams</h3>
                        </div>
                        <div className="contacts">
                            {contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => {
                                        changeCurrentChat(index, contact)
                                        handleCloseContact()
                                    }}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.userName}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Container>
               )
            )
        }
    </>

}


const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    // overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;

        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact{
            background-color: #fffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius:0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center; 
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 3rem;
                    
                }
            }
            .username {
                h3{
                    color: white;
                }
            }

        }
        .selected{
            background-color: #9186f3;
        }
    }
    .current-user{
        background-color: #0d0d30;
        display: flex;
        justiy-content:center;
        align-items: center;
        gap: 2rem;
        .avatar{
            img{
                max-inline-size: 100%;
                height:4rem;
            }
        }
        .username{
            h2{
                color: white;

            }
        }
        @media screen and (min-width:720px) and (max-width:1080px){
            gap: 0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
    }
    @media only screen and (max-width:720px){
    background-color: none;
        height: 100%;
    }
`



export default Contacts