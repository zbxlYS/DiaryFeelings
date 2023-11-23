'use client'

import React, { useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'


const page = () => {
    const [isDrag, setIsDrag] = useState(false)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [pos2, setPos2] = useState({ x: 0, y: 0 })

    const handleOnDrag = (e: DraggableEvent, data: DraggableData, setPosFunc: Function) => {
        setIsDrag(true)

        setPosFunc({ x: data.x, y: data.y })
    }

    const handleStopDrag = () => {
        setTimeout(() => {
            setIsDrag(false)
        }, 100)
    }
    return (
        <div className='w-full h-full'>
            <Draggable
                position={{ x: pos.x, y: pos.y }}
                onDrag={(e, data) => handleOnDrag(e, data, setPos)}
                onStop={handleStopDrag}
            >
                <div className='ml-[20px] relative w-[35px] h-[35px] border border-[tomato]'>
                    <div className='absolute top-[-10px] right-[-10px]'>
                        <span className='border bg-white px-[3px] py-[1px] rounded-md whitespace-nowrap text-[14px] shadow-lg'>X</span>
                    </div>
                </div>
            </Draggable>
            <Draggable
                position={{ x: pos2.x, y: pos2.y }}
                onDrag={(e, data) => handleOnDrag(e, data, setPos2)}
                onStop={handleStopDrag}
            >
                <div className='ml-[20px] relative w-[35px] h-[35px] border border-[tomato]'>
                    <div className='absolute top-[-10px] right-[-10px]'>
                        <span className='border bg-white px-[3px] py-[1px] rounded-md whitespace-nowrap text-[14px] shadow-lg'>X</span>
                    </div>
                </div>
            </Draggable>
        </div>
    )
}

export default page
