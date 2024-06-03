import { useState } from 'react';

function App() {

  return (
    <div>
      <h1>TO DO APP</h1>


      <section className="new-task">
        <form>
        <input id="name-input" placeholder="New Task"/>
        <input type="checkbox" id="Complete" />
        <button type="submit">Add to list</button>
        </form>
      </section>
    </div>
  );


}

export default App
