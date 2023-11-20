import Lottie from "react-lottie-player"
import lottieJson from './lottie-cat.json'

export default function Animation() {
    return (
        <div className="flex flex-col justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-40px]">
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 300, height: 300}}
            />
            <span className="text-[20px]">읽어오는 중... ✏️</span>
        </div>
    )
}