import React, { useState } from 'react'
import { useTodo } from '../Context';
import {Delete,Edit,Save} from "@mui/icons-material" 
import { IconButton } from '@mui/material';


function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false)
  const [Message, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: Message})
    setIsEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
      <div
          className={`flex border border-black/20 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-black duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                isEditable ? "border-black/20 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={Message}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isEditable}
          />
          <IconButton
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/20 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isEditable) {
                      editTodo();
                  } else setIsEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isEditable ? <Save/>: <Edit/>}
          </IconButton>
          <IconButton
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/20 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              <Delete/>
          </IconButton>
      </div>
  );
}

export default TodoItem;
