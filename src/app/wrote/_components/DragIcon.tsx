'use client'

import { useEffect, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'

interface Props {
    icon: string;
    icons: any;
    setIcons: any;
    num: number;
    str: string
}

const DragIcon = ({ icon, icons, setIcons, num, str}: Props) => {
    const [pos, setPos] = useState({x: 0, y: 0})
    const [isDrag, setIsDrag] = useState(false)

    const handleOnDrag = (e: DraggableEvent, data: DraggableData, setPos: Function) => {
        setIsDrag(true)
        setPos({ x: data.x, y: data.y })
    }
    const handleStopDrag = () => {
        setTimeout(() => {
            setIsDrag(false)
            setIcons((prev: any) => {
                const newArr = [...prev].map((data, index) => {
                    if(data.str === str) {
                        data.pos.x = pos.x
                        data.pos.y = pos.y
                    }
                    return data;
                })
                return newArr;
            })
            console.log(icons)
        }, 100)
    }
    useEffect(() => {
        console.log('----------', icons)
    },[icons])
    return (
        <Draggable
            position={{ x: pos.x, y: pos.y }}
            onDrag={(e, data) => handleOnDrag(e, data, setPos)}
            onStop={handleStopDrag}
            bounds="parent"
        >
            <div className={`relative w-[35px] h-[35px] flex justify-center items-center cursor-pointer`}>
                <div className='absolute top-[-10px] right-[-10px]'>
                    <span className='text-[30px]'>{icon}</span>
                    <span className='absolute top-[-5px] right-[-5px] whitespace-nowrap text-[14px]'>X</span>
                </div>
            </div>
        </Draggable>
    )
}

export default DragIcon