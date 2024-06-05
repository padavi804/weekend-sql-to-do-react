import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  let [todoNote, setTodoNote] = useState('');
  let [todoComplete, setTodoComplete] = useState('');
  let [todoArray, setTodoArray] = useState([]);

  const fetchList = () => {
    axios({
      method: 'GET',
      url: 'api/todo'
    })
      .then((response) => {
        console.log(response.data);
        setTodoArray(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(fetchList, []);

  const addTodo = (event) => {
    event.preventDefault();
    console.log(`The new task ${todoNote} is being added`)
    
    axios({
      method: 'POST',
      url: '/api/todo',
      data: {
        note: todoNote,
        complete: todoComplete
      }
    })
      .then((response) => {
        console.log('successful post', response);
        fetchList();
        setTodoNote('');
        setTodoComplete('');
      })
      .catch((error) => {
        console.log('post failed', error)
      })
  };

  const deleteTodo = (id) => {
    axios({
      method: 'DELETE',
      url:`/api/todo/${id}`,
    })
    .then((response) => {
      console.log('delete task worked', response)
      fetchList();
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  return (
    <div>
      <h1>TO DO APP</h1>


      <section className="new-task">
        <form onSubmit={addTodo}>
          <input id="name-input" placeholder="New Task" onChange={(evt) => setTodoNote(evt.target.value)} value={todoNote}/>
          <input id="complete-input" placeholder="Complete?" onChange={(evt) => setTodoComplete(evt.target.value)} value={todoComplete}/>
          <button type="submit">Add to list</button>
        </form>
      </section>

      <h2>Current List</h2>
      <ul>
        {todoArray.map((todo) => { return (<li key={todo.note} className = {todo.complete ? 'complete' : 'incomplete' }>{todo.note} is {todo.complete} <button onClick={() => todoComplete(todo.id)}> Complete </button> <button onClick={() => deleteTodo(todo.id)}>Delete</button></li>); })}
      </ul>
    </div>
  );


}

export default App
{/* // taskList.map((task_list) => { return (<li className = {task_list.complete ? "completed" : "notComplete"} key ={task_list.task}>{task_list.task} is {task_list.complete} */}
{/* <button onClick={() => completeTask(task_list.id)}>{task_list.complete ? "Mark not completed" : "Mark completed"}</button> */}