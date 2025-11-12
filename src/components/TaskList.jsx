function TaskList({ tasks, onToggle, onDelete }) {
  const sections = {
    morning: "🌅 المهام الصباحية",
    noon: "🌞 المهام الظهرية",
    evening: "🌙 المهام المسائية",
  };

  const grouped = {
    morning: tasks.filter((t) => t.time === "morning"),
    noon: tasks.filter((t) => t.time === "noon"),
    evening: tasks.filter((t) => t.time === "evening"),
  };

  return (
    <div className="task-list">
      {Object.keys(grouped).map((key) => (
        <div key={key} className="task-section">
          <h2>{sections[key]}</h2>
          {grouped[key].length === 0 ? (
            <p className="empty">لا توجد مهام</p>
          ) : (
            grouped[key].map((task) => (
              <div key={task.id} className={`task ${task.completed ? "done" : ""}`}>
                <span onClick={() => onToggle(task.id, task.completed)}>
                  {task.text}
                  
                </span>
                <button onClick={() => onDelete(task.id)}>❌</button>
                
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;