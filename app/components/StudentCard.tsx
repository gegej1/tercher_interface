interface StudentCardProps {
  name: string;
  score: number;
  attentionLevel: 'green' | 'yellow' | 'red';
  onClick: (name: string, score: number) => void;
}

export default function StudentCard({
  name,
  score,
  attentionLevel,
  onClick
}: StudentCardProps) {
  return (
    <div
      className="student-card"
      onClick={() => onClick(name, score)}
    >
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
      >
        <path
          d="M512 938.667C276.352 938.667 85.333 747.648 85.333 512S276.352 85.333 512 85.333 938.667 276.352 938.667 512 747.648 938.667 512 938.667zM299.221 778.923A339.883 339.883 0 0 0 512 853.333a340.053 340.053 0 0 0 220.459-80.725 297.77 297.77 0 0 0-213.632-89.941 297.856 297.856 0 0 0-219.606 96.256z m-59.605-61.27a382.933 382.933 0 0 1 279.21-120.32 382.805 382.805 0 0 1 271.446 112.384 341.333 341.333 0 1 0-550.656 7.979zM512 554.667a170.667 170.667 0 1 1 0-341.334 170.667 170.667 0 0 1 0 341.334z m0-85.334a85.333 85.333 0 1 0 0-170.666 85.333 85.333 0 0 0 0 170.666z"
          fill="#CDCDCD"
        />
      </svg>
      <div className="name">{name}</div>
      <div className={`attention-bar ${attentionLevel}`}></div>
    </div>
  )
}
