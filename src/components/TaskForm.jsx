import { useState } from "react";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("morning");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    /* const newTask = {
      id: Date.now(),
      text,
      time,
      completed: false,
    }; */

    onAdd({text, time,completed:false});
    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="أدخل المهمة..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="morning">🌅 صباح</option>
        <option value="noon">🌞 ظهر</option>
        <option value="evening">🌙 مساء</option>
      </select>
      <button type="submit">➕ أضف</button>
    </form>
  );
}

export default TaskForm;


