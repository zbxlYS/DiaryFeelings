import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2' // 원하는 차트 종류를 가져오세요.
import type { ChartData, ChartOptions } from 'chart.js' // 타입을 임포트하세요.

ChartJS.register(ArcElement, Tooltip, Legend)

const emotionImg: { [key: string]: string | { src: string; text?: string } } = {
  행복: { src: '/3_love.png', text: '늘 행복해 :)' },
  놀람: { src: '/happy.png', text: '엄마야!' },
  분노: { src: '/angry.png', text: '너무 화가난다아' },
  슬픔: { src: '/sad.png', text: '너무 슬퍼 :(' },
  불안: { src: '/depress.png', text: '너무 불안불안..' },
  중립: { src: '/nothinking.png', text: '나는 아무생각이없어' },
}

// data와 options의 타입을 ChartData와 ChartOptions로 지정하세요.
export const data: ChartData<'pie'> = {
  labels: ['행복', '기쁨', '화남', '슬픔', '불안', '생각없음'],
  datasets: [
    {
      label: '',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(240, 207, 211, 0.2)',
        'rgba(249, 207, 157, 0.2)',

        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)',

        'rgba(181, 224, 251, 0.2)',
        'rgba(171, 171, 171, 0.2)', // 생각없음
      ],
      borderColor: [
        'rgba(240, 207, 211, 0.5)',
        'rgba(249, 207, 157, 0.5)',

        'rgba(255, 99, 132, 0.5)',
        'rgba(75, 192, 192, 0.5)',

        'rgba(181, 224, 251, 0.5)',
        'rgba(171, 171, 171, 0.5)', // 생각없음
      ],
      borderWidth: 1,
    },
  ],
}

export const options: ChartOptions<'pie'> = {
  // 차트 옵션을 설정하세요.
}

export function DoughnuChart() {
  return <Pie data={data} options={options} />
}
