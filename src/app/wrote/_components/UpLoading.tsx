import LottieCat from '@/app/components/LottieCat'

const UpLoading = () => {
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-white z-10 flex justify-center items-center">
            <LottieCat text={'작성 중이에요 ✏️'}/>
        </div>
    )
}

export default UpLoading