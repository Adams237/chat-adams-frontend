import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/e363e38ceffaece60e00b87ee4286e08.gif"

function Welcome({ user }) {
  return (
    <Container>
        <img src={Robot} alt='Robot'/>
        <h1>Bienvenu, <span>{user.userName}!</span></h1>
        <h3>S'il vous plait choisissez la conversation que vous voulez lancer</h3>
    </Container>
  )
}



const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height:20rem;
    }
    span{
        color: #4e00ff;
    }
`

export default Welcome