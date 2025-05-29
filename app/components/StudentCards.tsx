import StudentCard from './StudentCard'

interface StudentCardsProps {
  onStudentClick: (name: string, distraction: number) => void;
}

export default function StudentCards({ onStudentClick }: StudentCardsProps) {
  // 模拟学生数据
  const students = [
    { name: '学生1', distraction: 3, attentionLevel: 'green' as const },
    { name: '学生2', distraction: 5, attentionLevel: 'yellow' as const },
    { name: '学生3', distraction: 8, attentionLevel: 'red' as const },
    { name: '学生4', distraction: 2, attentionLevel: 'green' as const },
    { name: '学生5', distraction: 4, attentionLevel: 'yellow' as const },
    { name: '学生6', distraction: 7, attentionLevel: 'red' as const },
    { name: '学生7', distraction: 1, attentionLevel: 'green' as const },
    { name: '学生8', distraction: 6, attentionLevel: 'yellow' as const },
    { name: '学生9', distraction: 9, attentionLevel: 'red' as const },
    { name: '学生10', distraction: 0, attentionLevel: 'green' as const },
    { name: '学生11', distraction: 3, attentionLevel: 'yellow' as const },
    { name: '学生12', distraction: 10, attentionLevel: 'red' as const },
    { name: '学生13', distraction: 2, attentionLevel: 'green' as const },
    { name: '学生14', distraction: 4, attentionLevel: 'yellow' as const },
    { name: '学生15', distraction: 7, attentionLevel: 'red' as const },
    { name: '学生16', distraction: 1, attentionLevel: 'green' as const },
    { name: '学生17', distraction: 5, attentionLevel: 'yellow' as const },
    { name: '学生18', distraction: 8, attentionLevel: 'red' as const },
    { name: '学生19', distraction: 0, attentionLevel: 'green' as const },
    { name: '学生20', distraction: 3, attentionLevel: 'yellow' as const },
  ]

  return (
    <div className="student-cards">
      {students.map((student, index) => (
        <StudentCard
          key={index}
          name={student.name}
          distraction={student.distraction}
          attentionLevel={student.attentionLevel}
          onClick={onStudentClick}
        />
      ))}
    </div>
  )
}
