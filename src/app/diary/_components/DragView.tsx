'use client'

import { useEffect, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'

interface Props {
    data: any
}

const DragView = ({data}: Props) => {
    const [pos, setPos] = useState({x: data.pos.x, y: data.pos.y})
    const [isDrag, setIsDrag] = useState(false)

    const handleOnDrag = (e: DraggableEvent, data: DraggableData, setPos: Function) => {
        setIsDrag(true)
        setPos({ x: data.x, y: data.y })
    }
    const handleStopDrag = () => {
        setTimeout(() => {
            setIsDrag(false)
        }, 100)
    }
    return (
        <Draggable
            position={{ x: pos.x, y: pos.y }}
            onDrag={(e, data) => handleOnDrag(e, data, setPos)}
            onStop={handleStopDrag}
            bounds="parent"
        >
            <div className={`relative w-[35px] h-[35px] flex justify-center items-center cursor-pointer`}>
                <div className='absolute top-[-10px] right-[-10px]'>
                    <span className='text-[30px]'>{data.data}</span>
                    <span className='absolute top-[-5px] right-[-5px] whitespace-nowrap text-[14px]'>X</span>
                </div>
            </div>
        </Draggable>
    )
}

export default DragView