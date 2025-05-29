import StudentCard from './StudentCard'

interface StudentData {
  id: string
  name: string
  score: number
  level: 'high' | 'medium' | 'low'
  lastUpdate: number
}

interface StudentCardsProps {
  students: Map<string, StudentData>
  onStudentClick: (name: string, score: number) => void;
}

export default function StudentCards({ students, onStudentClick }: StudentCardsProps) {
  // 将Map转换为数组
  const studentArray = Array.from(students.values())

  // 将level转换为attentionLevel
  const getAttentionLevel = (level: 'high' | 'medium' | 'low'): 'green' | 'yellow' | 'red' => {
    switch (level) {
      case 'high': return 'green'
      case 'medium': return 'yellow'
      case 'low': return 'red'
      default: return 'yellow'
    }
  }

  return (
    <div className="student-cards">
      {studentArray.length > 0 ? (
        studentArray.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            score={student.score}
            attentionLevel={getAttentionLevel(student.level)}
            onClick={onStudentClick}
          />
        ))
      ) : (
        <div className="no-students">
          <p>等待学生连接...</p>
          <p className="text-sm text-gray-500 mt-2">
            请确保学生端已启动摄像头并连接到WebSocket服务
          </p>
        </div>
      )}
    </div>
  )
}
