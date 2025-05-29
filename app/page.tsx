'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import HeatMap from './components/HeatMap'
import StudentCards from './components/StudentCards'
import Sidebar from './components/Sidebar'
import StudentModal from './components/StudentModal'
import { TeacherWebSocketClient, StudentAttentionUpdate } from '../lib/websocket'

interface StudentData {
  id: string
  name: string
  score: number
  level: 'high' | 'medium' | 'low'
  lastUpdate: number
}

export default function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    score: number;
    level?: 'high' | 'medium' | 'low';
    lastUpdate?: number;
  } | null>(null)

  const [students, setStudents] = useState<Map<string, StudentData>>(new Map())
  const [wsClient, setWsClient] = useState<TeacherWebSocketClient | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')

  // 初始化WebSocket连接
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'
    const client = new TeacherWebSocketClient(wsUrl)

    // 设置事件回调
    client.onConnected(() => {
      console.log('🏫 教师端WebSocket连接成功')
      setConnectionStatus('connected')
    })

    client.onDisconnected(() => {
      console.log('🏫 教师端WebSocket连接断开')
      setConnectionStatus('disconnected')
    })

    client.onStudentUpdate((update: StudentAttentionUpdate) => {
      handleStudentUpdate(update)
    })

    client.onError((error: string) => {
      console.error('🏫 WebSocket错误:', error)
      setConnectionStatus('disconnected')
    })

    // 连接WebSocket
    setConnectionStatus('connecting')
    client.connect().catch((error: unknown) => {
      console.error('🏫 WebSocket连接失败:', error)
      setConnectionStatus('disconnected')
    })

    setWsClient(client)

    // 清理函数
    return () => {
      client.disconnect()
    }
  }, [])

  // 处理学生专心度更新
  const handleStudentUpdate = (update: StudentAttentionUpdate) => {
    console.log('📊 教师端处理学生更新:', update)

    setStudents(prevStudents => {
      const newStudents = new Map(prevStudents)
      newStudents.set(update.studentId, {
        id: update.studentId,
        name: `学生${update.studentId.replace('student_', '')}`, // 从student_1变成学生1
        score: update.score,
        level: update.level,
        lastUpdate: update.timestamp
      })
      return newStudents
    })
  }

  const handleStudentClick = (name: string, score: number) => {
    // 找到对应的学生数据
    const studentData = Array.from(students.values()).find(s => s.name === name)
    setSelectedStudent({
      name,
      score,
      level: studentData?.level,
      lastUpdate: studentData?.lastUpdate
    })
  }

  const handleCloseModal = () => {
    setSelectedStudent(null)
  }

  return (
    <>
      <Header />
      <div className="container">
        <Navigation />
        <div className="main-content">
          <HeatMap />
          <StudentCards students={students} onStudentClick={handleStudentClick} />
        </div>
        <Sidebar />
      </div>

      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={handleCloseModal}
        />
      )}

      <footer>
        数据本地分析中，符合 COPPA 安全标准
      </footer>
    </>
  )
}
