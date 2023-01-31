import React from 'react'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components'
import Robot from "../assets/e363e38ceffaece60e00b87ee4286e08.gif"

function Welcome({ user, handleShowContact }) {
  return (
    <Container>
      <Button className='button'  onClick={handleShowContact}>
        Contacts
      </Button>
      <div className='contain'>
      <img src={Robot} alt='Robot'/>
              <h1>Bienvenu, <span>{user.userName}!</span></h1>
              <h3>S'il vous plait choisissez la conversation que vous voulez lancer</h3>
      </div>
        
    </Container>
  )
}



const Container = styled.div`
    display: flex;
    .button{
        width: 90px;
        background-color: green;
        border-color: green;
        display: none;
    }
    .contain {
      margin: auto;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left:30%;
      color: white;
      img{
       
          height:10rem;
      }
      span{
          color: #4e00ff;
      }
    }
    
    @media only screen and (max-width:720px){
      display: grid;
      grid-template-rows:10% 90%;
      .button{
        display: flex;
      }
  }
`

export default Welcome