import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

export const Button = styled.button`
    text-align: center;
    padding: .5em;
    width: 100%;
    background-color: green;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
`

export const Input = styled.input`
    border: 1px solid grey;
    padding: .5em;
    border-radius: 10px;
`