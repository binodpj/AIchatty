import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

export default function Sidebar() {

    const [extended, setExtended] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    //to load the older prompts while clicking them
    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }


    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_bar} alt="menu_bar" />
                <div onClick={()=>newChat()} className='new-chat'>
                    <img src={assets.plus} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended
                    ?
                    <div className='recent'>
                        <p className='recent-title'> Recent</p>
                        {/* saving last prompts on sidebar */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={()=> loadPrompt(item)} className='recent-entry'>
                                    <img src={assets.message} alt="" />
                                    <p>{item.slice(0,24)}...</p>
                                </div>
                            )
                        })}

                    </div>
                    :
                    null

                }

            </div>

            {/* <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div> */}
        </div>
    )
}
