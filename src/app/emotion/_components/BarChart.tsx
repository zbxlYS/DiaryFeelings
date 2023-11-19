import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

// 타입 정의
type Dataset = {
  label: string
  data: any[]
  backgroundColor: string[]
  borderColor: string[]
  borderWidth: number
}

type Data = {
  labels: string[]
  datasets: Dataset[]
}

type Options = {
  scales: {
    y: {
      beginAtZero: boolean
      max: number
    }
  }
}

type EmotionImgData = {
  src?: string
  text?: string
}

const emotionImg: { [key: string]: string | { src: string; text?: string } } = {
  행복: { src: '/3_love.png', text: '늘 행복해 :)' },
  놀람: { src: '/happy.png', text: '엄마야!' },
  분노: { src: '/angry.png', text: '너무 화가난다아' },
  슬픔: { src: '/sad.png', text: '너무 슬퍼 :(' },
  불안: { src: '/depress.png', text: '너무 불안불안..' },
  중립: { src: '/nothinking.png', text: '나는 아무생각이없어' },
}
const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null) // ref 타입 명시
  let chartInstance: Chart | null = null // chartInstance 타입 명시

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d') // optional chaining 사용

    const createChart = () => {
      Chart.register(...registerables)
      chartInstance = new Chart(ctx as CanvasRenderingContext2D, {
        // ctx 타입 단언
        type: 'bar',
        data: {
          labels: [
            '행복',
            '기쁨',
            // '사랑',
            '화남',
            '슬픔',
            // '우울',
            '불안',
            '생각없음 ',
          ],
          datasets: [
            {
              label: '11월 감정 기록',
              data: [10, 5, 2, 7, 4, 5],
              backgroundColor: [
                'rgba(240, 207, 211, 0.4)',
                'rgba(255, 206, 86, 0.4)',

                // 'rgba(239, 203, 207, 0.2)', // 사랑
                'rgba(255, 99, 132, 0.4)',
                'rgba(75, 192, 192, 0.4)',

                // 'rgba(174, 221, 251, 0.2)', // 우울
                'rgba(181, 224, 251, 0.4)',
                'rgba(171, 171, 171, 0.4)', // 생각없음
              ],
              borderColor: [
                'rgba(240, 207, 211, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(239, 203, 207, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                // 'rgba(174, 221, 251, 1)', //우울
                'rgba(181, 224, 251, 1)',
                'rgba(171, 171, 171, 1)', // 생각없음
              ],
              borderWidth: 1,
            },
          ],
        } as unknown as Data, // data 타입 단언
        options: {
          // 다른 차트 옵션들
          plugins: {
            example: { option1: 'value1', option2: 'value2' }, // 플러그인 옵션
            labels: {},
          },
          scales: {
            x: {
              grid: {
                display: false, // Set display to false to hide grid lines
              },
            },
            y: {
              beginAtZero: true,
              max: 30,
              grid: {
                display: false, // Set display to false to hide grid lines
              },
            },
          },
        } as Options, // options 타입 단언
      })
    }

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
      }
    }

    destroyChart() // 기존 차트 파괴
    createChart() // 새로운 차트 생성

    return () => {
      destroyChart() // 컴포넌트가 unmount될 때 차트 파괴
    }
  }, [])

  return <canvas ref={chartRef} className="" />
}

export default BarChart
