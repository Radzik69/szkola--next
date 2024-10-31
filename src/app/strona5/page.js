"use client"
import { useState } from 'react';

let listID = 0;

export default function List() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  const handleClick = () => {
    setList([...list,{ id: listID++, name: name }])
}

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)}></input>
      <button onClick={handleClick}>Add</button>
      <ul>
        {list.map(list => (
          <ol key={list.id}>{list.name}</ol>
        ))}
      </ul>
    </>
  );
}

        