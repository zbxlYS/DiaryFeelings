import { useState } from "react";

const NotLoginMain = () => {
    const [hover, setHover] = useState<string | null>(null);
    const [lastHoveredImage, setLastHoveredImage] = useState<string | null>(null);

    const handleMouseOver = (image: string) => {
        setHover(image);
        setLastHoveredImage(image); // 마지막으로 호버된 이미지 업데이트
    };

    const handleMouseOut = () => {
       
    };

    const renderImage = (imageSource: string) => {
        return (
            <div className="w-[1400px] h-[300px] border border-[tomato] mt-[50px]">
                <img src={imageSource} alt="Descriptive Text of Image" className="w-full h-auto object-contain" />
            </div>
        );
    };

    // 이미지 렌더링 조건을 수정하여 호버된 이미지 또는 마지막으로 호버된 이미지를 표시
    const shouldRenderImage = (image: string) => {
        return hover === image || lastHoveredImage === image;
    };

    return (
        <div className="w-full flex flex-col justify-center items-center pt-[150px] pb-[150px]">
            <div className="flex flex-col justify-center items-center">
                <span className="text-[60px] font-bold">
                    하루를 기록하는 일기
                </span>
                <span className="text-lg">
                    당신의 감정을 기록하고, 되돌아 보세요.
                </span>
                <span className="mt-[50px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer">
                    내 감정을 기록하기
                </span>
            </div>

            <div className="flex flex-col w-full justify-center items-center mt-[100px]">
                <div className="border w-[1200px] h-[300px] overflow-hidden">
                    <img src="/ddiary.png" alt="Descriptive Text of Image" className="w-full h-auto object-cover object-center" />
                </div>

                <div className="flex justify-center items-center w-full">
                    {/* 일기 작성하기 Section */}
                    <div className="flex items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'first' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('first')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]"></div>
                                <span className="text-[20px] ml-[10px] font-bold">일기 작성하기</span>
                            </div>
                        </div>
                    </div>

                    {/* 나에게 한 마디 Section */}
                    <div className="flex items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'second' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('second')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]"></div>
                                <span className="text-[20px] ml-[10px] font-bold">나에게 한 마디</span>
                            </div>
                        </div>
                    </div>

                    {/* 달력 보기 Section */}
                    <div className="flex items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'third' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('third')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]"></div>
                                <span className="text-[20px] ml-[10px] font-bold">달력 보기</span>
                            </div>
                        </div>
                    </div>

                    {/* 감정 그래프 Section */}
                    <div className="flex items-center p-[60px]">
                        <div className={`flex flex-col justify-center items-start p-[20px] rounded-md border cursor-pointer duration-200 ${hover === 'fourth' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('fourth')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[15px]">
                                <div className="w-[25px] h-[25px] border rounded-md bg-[#b2a4d4]"></div>
                                <span className="text-[20px] ml-[10px] font-bold">감정 그래프</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 페이지 이용 방법 이미지 Section */}
                {shouldRenderImage('first') && renderImage("/cat.jpg")}
                {shouldRenderImage('second') && renderImage("/catcatcat.png")}
                {shouldRenderImage('third') && renderImage("/달력.png")}
                {shouldRenderImage('fourth') && renderImage("/cat1.png")}

                {/* 나머지 컴포넌트 부분 */}
                <div className="w-full flex justify-center items-center mt-[800px]">
                    <span className="mt-[50px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer" style={{ marginTop: '100px' }}>
                        감정을 기록하러 가볼까요?
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NotLoginMain;
