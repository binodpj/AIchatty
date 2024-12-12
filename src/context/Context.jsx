import { createContext, useState } from "react";
import run from "../config/gemini"

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    //when we click on new chat, home screen is shown
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt) => {
        
        // result data is empty at first and loading is true
        setResultData("")
        setLoading(true)
        
        //cards are removed when onsent function executes
        setShowResult(true)

        let response = "";

        //runs when older prompts are clicked from history
        if(prompt !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        //runs new prompt is given form input
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }

        let responseArray = response.split("**")
        let newResponse = "";
        for(let i=0; i < responseArray.length; i++){
            if(i==0 || i%2 === 0){
                newResponse += responseArray[i]
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        //setting result and loading ends
        setResultData(newResponse2)
        setLoading(false)

        //reseting input field
        setInput("")

    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
} 

export default ContextProvider
