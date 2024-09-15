import { atom } from "jotai";

const messageAtom = atom<Message[]>([
    {
        id:0,
        message:"Hello",
        type:"HUMAN"
    },
    {
        id:1,
        message:"Hello, What are your concerns?",
        type:"AI"
    },
    {
        id:2,
        message:"Could you tell me about the trends in 2015?",
        type:"HUMAN"
    }
])


export {messageAtom}