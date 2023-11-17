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
            '사랑',
            '화남',
            '슬픔',
            '우울',
            '불안',
            '생각없음 ',
          ],
          datasets: [
            {
              label: '{11월} 감정 기록',
              data: [15, 20, 60, 10, 22, 30, 2, 10],
              backgroundColor: [
                'rgba(255, 159, 64, 0.2)', // 행복
                'rgba(255, 206, 86, 0.2)', // 기쁨
                'rgba(239, 203, 207, 0.2)', // 사랑
                'rgba(255, 99, 132, 0.2)', // 화남
                'rgba(75, 192, 192, 0.2)', // 슬픔
                'rgba(174, 221, 251, 0.2)', // 우울
                'rgba(153, 102, 255, 0.2)', // 불안
                'rgba(171, 171, 171, 0.2)', // 생각없음
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(239, 203, 207, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(174, 221, 251, 1)', //우울
                'rgba(153, 102, 255, 1)', // 불안
                'rgba(171, 171, 171, 1)', // 생각없음
              ],
              borderWidth: 1,
            },
          ],
        } as Data, // data 타입 단언
        options: {
          scales: {
            x: {
              grid: {
                display: false, // Set display to false to hide grid lines
              },
            },
            y: {
              beginAtZero: true,
              max: 100,
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

  return <canvas ref={chartRef} />
}

export default BarChart
