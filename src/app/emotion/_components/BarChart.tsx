import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

// 타입 정의
type Dataset = {
  label: string
  data: number[]
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
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [15, 20, 60, 10, 22, 30],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        } as Data, // data 타입 단언
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
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
