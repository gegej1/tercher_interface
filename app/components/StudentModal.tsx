interface StudentModalProps {
  student: {
    name: string;
    distraction: number;
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
          <div className="data-item">专心状态：<span>正常</span></div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>关闭</button>
        </div>
      </div>
    </>
  )
}
