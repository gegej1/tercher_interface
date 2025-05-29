interface StudentModalProps {
  student: {
    name: string;
    score: number;
    level?: 'high' | 'medium' | 'low';
    lastUpdate?: number;
  };
  onClose: () => void;
}

export default function StudentModal({ student, onClose }: StudentModalProps) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-header">{student.name} 的详情</div>
        <div className="modal-content">
          <div className="data-item">
            专心度分数：<span className="score">{student.score}/100</span>
          </div>
          <div className="data-item">
            专心状态：<span className={`status ${student.level || 'medium'}`}>
              {student.score >= 70 ? '专心' : student.score >= 40 ? '一般' : '分心'}
            </span>
          </div>
          <div className="data-item">
            颜色等级：<span className={`level ${student.level || 'medium'}`}>
              {student.level === 'high' ? '🟢 绿色 (专心)' :
               student.level === 'medium' ? '🟡 黄色 (一般)' :
               student.level === 'low' ? '🔴 红色 (分心)' : '🟡 黄色 (一般)'}
            </span>
          </div>
          {student.lastUpdate && (
            <div className="data-item">
              最后更新：<span>{new Date(student.lastUpdate).toLocaleTimeString()}</span>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>关闭</button>
        </div>
      </div>
    </>
  )
}
