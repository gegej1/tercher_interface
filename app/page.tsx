'use client'

import { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import HeatMap from './components/HeatMap'
import StudentCards from './components/StudentCards'
import Sidebar from './components/Sidebar'
import StudentModal from './components/StudentModal'

export default function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    distraction: number;
  } | null>(null)

  const handleStudentClick = (name: string, distraction: number) => {
    setSelectedStudent({ name, distraction })
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
          <StudentCards onStudentClick={handleStudentClick} />
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
