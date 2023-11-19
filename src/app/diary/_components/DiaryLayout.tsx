import { IDiary } from '@/app/types/type';
import moment from 'moment';
import Image from 'next/image';
interface Props {
  data: IDiary
}
const emotionImg: { [key: string]: string } = {
        "중립": "/kkomul.png",
        "슬픔": "/sad.png",
        "분노": "/angry.png",
        "놀람": "/yuumi.png",
        "행복": "/3_love.png",
        "불안": "/depress.png"
};
const Diary = ({data}: Props) => {
  return (
    <div className="border relative w-[350px] h-[500px] rounded-[20px] flex flex-col justify-between overflow-hidden pb-[10px] shadow-lg mx-[35px] mb-[140px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer">
      <div className="relative w-full h-[250px] bg-gray-200 object-cover">
        <div className="w-full h-full object-cover overflow-hidden flex justify-center items-center">
        {
            data.image_src && (
              <Image
                src={data.image_src.split(',')[0]}
                width={350}
                height={250}
                alt='image'
              />
            )
          }
        </div>
        <div className="absolute p-[7px] w-[60px] h-[60px] rounded-[50%] bg-white shadow-lg bottom-[-30px] right-[30px] object-cover overflow-hidden z-10">
          <img src={data.diary_userEmo ? emotionImg[data.diary_userEmo] : "/kkomul.png"} alt="" className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col w-full p-[20px] justify-around">
        <div className="flex flex-col w-full">
          <span className="text-[18px] font-pretendard">{data.diary_title}</span>
          <pre className="text-sm mt-[20px] text-gray-400 whitespace-pre-wrap font-pretendard">
            {
              data.diary_content.length >= 68 ? `${data.diary_content.replaceAll('\n',' ').slice(0,68)}...` : data.diary_content.replaceAll('\n',' ')
            }
          </pre>
        </div>
      </div>
      <div className="flex items-center mb-[20px] ml-[20px]">
        <div className="w-[40px] h-[40px] rounded-[50%] bg-white shadow-lg overflow-hidden object-contain">
          <img src="./yuumi.jpg" alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col ml-[15px] justify-center">
          <span className="text-gray-600 text-[14px]">{data.user_name}</span>
          <span className="text-gray-400 text-[12px]">{moment(data.diary_userDate).format('YYYY-MM-DD-HH:MM')}</span>
        </div>
      </div>
    </div>
  )
}

export default Diary
