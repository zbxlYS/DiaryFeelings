'use client'

import { IDiary } from "@/app/types/type";
import { useEffect, useRef, useState, forwardRef } from "react"
import RadioGroup from "../../_components/RadioGroup"
import Image from "next/image"
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css'
import RadioEmo from "../../_components/RadioEmo"
import { useSession } from "next-auth/react"
import axios from "axios"


interface Props {
    id: string;
    test: string;
}

const Modify = ({params}: { params: Props}) => {
    let data: any = {}
    const { data: session, status } = useSession();
    // if(status === 'loading') {
    //     return <Loading />
    // }
    const [value, setValue] = useState('happy');
    const [view, setView] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [weather, setWeather] = useState('sunny');
    const [selWeather, setSelWeather] = useState(false);
    const [selFont, setSelFont] = useState(false);
    const [curFont, setCurFont] = useState('pretendard')
    const [imgUrl, setImgUrl] = useState('');

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState('');

    const emotionList = [
        ["happy", "오늘은 행복한 날이에요!"],
        ["sad", "오늘은 슬픈 날이에요..."],
        ["angry", "오늘은 뿔나는 날이에요!!"],
        ["depress", "오늘은 풀죽은 날이에요..."],
        ["normal", "오늘은 무난한 날이에요."]
    ]
    const fontList = [
        ["프리텐다드", "pretendard"],
        ["바른히피", "bareunhipi"],
        ["오뮤 다예쁨","omyu"],
        ["네이버 나눔고딕","nanum"],
        ["리디바탕","ridi"],
        ["아인맘","ainmom"],
        ["교보 손글씨","kyobo"],
        ["신동엽 손글씨","shin"]
    ]
    const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
        // any 안 쓰고 싶은데 몰루겠다...
        <div className="flex">
            <span
                onClick={onClick}
                ref={ref}
                className="cursor-pointer hover:text-[#b2a4d4]"
            >{value}</span>
        </div>
    ));
    const handleImgView = (e: React.ChangeEvent<{ files: FileList | null }>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            URL.revokeObjectURL(imgUrl);
            setImgUrl(prev => URL.createObjectURL(file));
        }
    };
    const send = async() => {
        console.log('hi')
        if(!session) return

        if(!titleRef.current) {
            alert('제목을 입력해 주세요.')
            return;
        }
        if(!contentRef.current) {
            alert('내용을 입력해 주세요.')
            return;
        }
        const formData = new FormData();
        formData.append('title', titleRef.current.value)
        formData.append('content', contentRef.current.value)
        formData.append('id', session?.user?.id as string)
        formData.append('name', session?.user?.name as string)
        formData.append('weather', weather)
        formData.append('emotion', value)
        formData.append('datetime', date.toString())
        formData.append('font', curFont)
        formData.append('diary_num', params.id)
        const result = await axios.patch(
            `/api/diary/${params.id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `mlru ${session?.accessToken}`
                }
            }
        );
        console.log(result.data)
    }
    const getData = async(id: string) => {
        const result = await fetch(
            `/api/diary/${id}`
        );
        const rst = await result.json();
        data = rst
        console.log(data);
        setTitleValue(prev => data.result.diary_title)
        setContentValue(prev => data.result.diary_content);
        setImgUrl(prev => {
            return data.result.image_src.split(',')[1]
                ? data.result.image_src.split(',')[1]
                : data.result.image_src.split(',')[0]
        })
        setWeather(prev => data.result.diary_weather)
        setValue(prev => data.result.diary_userEmo)
        // setDate(prev => new Date(data.result.updated_at))
    }
    useEffect(() => {
        getData(params.id)
    },[])
    // const data = await getData(params.id)
    return (
        <>
        {
            (
                <div className="w-[1280px] h-[600px] flex flex-col items-end p-[10px] relative">
                    <div className="absolute p-[10px] shadow-xl rounded-md my-[20px] flex flex-col justify-center items-center top-0 right-[-150px]">
                        <div className="relative flex flex-col justify-center items-center"
                            onMouseOver={() => setSelWeather(true)}
                            onMouseLeave={() => setSelWeather(false)}
                        >
                            <span>오늘의 날씨</span>
                            <Image
                                src={`/${weather}.png`}
                                width={100}
                                height={100}
                                alt='weather'
                            />
                            {
                                selWeather ? (
                                    <div className="absolute left-[50%] translate-x-[-50%] p-[3px] px-[10px] flex justify-center items-center bottom-[0px] bg-white border gap-[10px] whitespace-nowrap rounded-md shadow-lg">
                                        <span className="cursor-pointer hover:text-[#b2a4d4]"
                                            onClick={() => setWeather('sunny')}
                                        >맑음</span>
                                        <span> | </span>
                                        <span className="cursor-pointer hover:text-[#b2a4d4]"
                                            onClick={() => setWeather('cloudy')}
                                        >흐림</span>
                                        <span> | </span>
                                        <span className="cursor-pointer hover:text-[#b2a4d4]"
                                            onClick={() => setWeather('rainy')}
                                        >비</span>
                                    </div>

                                ) : null
                            }
                        </div>
                        <DatePicker
                            selected={date}
                            locale={ko}
                            dateFormat="yyyy. MM. dd"
                            closeOnScroll={true}
                            onChange={(date: Date) => setDate(date)}
                            customInput={<CalendarInput />}
                        />
                    </div>
                    <input type='text' onChange={(e) => setTitleValue(e.target.value)} value={titleValue} ref={titleRef} className={`w-full h-[50px] px-[10px] py-[30px] text-[30px] mt-[30px] border-b-[2px] outline-0 bg-[transparent] font-${curFont}`} />
                    <div className="w-full py-[10px] mt-[10px] flex items-center flex flex-col justify-center items-center">
                        <RadioGroup label="emotion" value={value} onChange={setValue}>
                            {
                                emotionList.map((data, index) => (
                                    <RadioEmo
                                        key={index}
                                        view={view}
                                        value={value}
                                        setView={setView}
                                        emoHover={data[0]}
                                        emotion={data[1]}
                                    />
                                ))
                            }
                        </RadioGroup>
                        <div className="mt-[60px] w-full flex">
                            <div className="mr-[30px]">
                                <div className="w-[300px] h-[300px] rounded-md bg-gray-200 object-contain flex justify-center items-center overflow-hidden">
                                    {
                                        imgUrl && (
                                            <Image
                                                src={imgUrl}
                                                alt='preview'
                                                width={300}
                                                height={300}
                                            />
                                        )
                                    }

                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <div className="relative border p-[5px] mb-[5px] rounded-md flex items-center">
                                    <div className="cursor-pointer"
                                        onMouseOver={() => setSelFont(true)}
                                        onMouseLeave={() => setSelFont(false)}
                                    >
                                        <span className="relatvie">폰트를 바꿔 보세요!</span>
                                        {
                                            selFont ? (
                                                <div className="absolute p-[3px] flex flex-col justify-center items-center border bg-white rounded-md cursor-pointer">
                                                    {
                                                        fontList.map((data, index) => (
                                                            <span key={index} className={`my-[2px] font-${data[1]} hover:text-[#b2a4d4]`}
                                                                onClick={() => setCurFont(`${data[1]}`)}
                                                            >{data[0]}</span>
                                                        ))
                                                    }
                                                </div>
                                            ) : null
                                        }
                                    </div>

                                </div>
                                <textarea ref={contentRef} name="content" id="content"
                                    onChange={(e) => setContentValue(e.target.value)}
                                    value={contentValue}
                                    className={`border resize-none w-full h-full outline-none rounded-md p-[10px] text-lg bg-[transparent] font-${curFont}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#b2a4d4] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1]">
                        <span className="text-lg"
                            onClick={send}
                        >
                            작성 완료
                        </span>
                    </div>
                </div>

            )
        }
        </>
    )
}

export default Modify