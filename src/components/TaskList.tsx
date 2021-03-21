import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  
  function generateRandomId() {
    const taskId = tasks.map(tasks => tasks.id);
    let id = 1;
   
    while (taskId.includes(id)) {
     id = Math.floor(Math.random() * 100) + 1;
    }
    return id;
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle.length > 0) {
      const newTask: Task = {
        id: generateRandomId(),
        title: newTaskTitle,
        isComplete: false
      };
      
      setTasks(tasks => [...tasks, newTask]);
      setNewTaskTitle('');

    }

  }

  function handleToggleTaskCompletion(id: number) {
    const index=tasks.findIndex(element => element.id == id);
    
    let temtaskList = [...tasks];
    temtaskList[index].isComplete === true ? temtaskList[index].isComplete=false : temtaskList[index].isComplete=true;
    setTasks(temtaskList);
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const index=tasks.findIndex(element => element.id == id);
    let temtaskList = [...tasks];
    temtaskList.splice(index, 1);
    setTasks(temtaskList);
  }

  return (
    <section className="task-list container">
      <header>
      
        <h2>
          My tasks
        </h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Add New Item" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}