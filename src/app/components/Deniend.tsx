import Image from "next/image"

const Denined = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Image
                    src={'/nervous.png'}
                    width={150}
                    height={150}
                    alt='image'
                />
                <h1>접근할 수 없는 페이지예요... 🥹</h1>
            </div>
        </div>
    )
}

export default Denined