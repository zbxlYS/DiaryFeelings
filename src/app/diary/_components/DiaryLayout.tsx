const Diary = () => {
  return (
    <div className="border relative w-[350px] h-[500px] rounded-[20px] flex flex-col justify-between overflow-hidden pb-[10px] shadow-lg mx-[35px] mb-[140px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer">
      <div className="relative w-full h-[250px] bg-gray-200 object-cover">
        <div className="w-full h-full object-cover overflow-hidden flex justify-center items-center">
          <img src="./rain.png" alt="" className="w-full" />
        </div>
        <div className="absolute p-[7px] w-[60px] h-[60px] rounded-[50%] bg-white shadow-lg bottom-[-30px] right-[30px] object-cover overflow-hidden z-10">
          <img src="./kkomul.png" alt="" className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col w-full p-[20px] justify-around">
        <div className="flex flex-col w-full">
          <span className="text-[18px] font-pretendard">오늘은 비가 왔다.</span>
          <pre className="text-sm mt-[20px] text-gray-400 whitespace-pre-wrap font-pretendard">
            비가 내리면 마asdfasdfasdfdsafsad음에 휴식이 찾아와서 나는 비
            오는...
          </pre>
        </div>
      </div>
      <div className="flex items-center mb-[20px] ml-[20px]">
        <div className="w-[40px] h-[40px] rounded-[50%] bg-white shadow-lg overflow-hidden object-contain">
          <img src="./yuumi.jpg" alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col ml-[15px] justify-center">
          <span className="text-gray-600 text-[14px]">유미</span>
          <span className="text-gray-400 text-[12px]">2023. 11. 11</span>
        </div>
      </div>
    </div>
  )
}
