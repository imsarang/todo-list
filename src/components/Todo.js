import React,{useState,useEffect} from 'react';
import "./todo.css"

// get the local storage data back:
const getLocalData = ()=>{
    const lists = localStorage.getItem("mytodolist")

    if(lists){
        // converting key-value to array:
        return JSON.parse(lists);
    }else{
        return []
    }
}


const Todo = () => {

    const [hover,setHover] = useState(false);
    const [inputTodo,setInputTodo] = useState("");
    const [inputType,setInputType] = useState("");
    const [toggleButton,setToggle] = useState(false);
    const [items,setItems] = useState(getLocalData())
    const [editedItem,setEditedItem] = useState();

    const hover_on = ()=>setHover(true);
    const hover_off = ()=>setHover(false)
    
    const clearTodo = ()=>{
        setInputTodo("")
        setInputType("")
    }

    const addTodo=()=>{
        if(!inputTodo || !inputType||(!inputTodo&&!inputType))alert("Enter all the inputs!");
        
        else if(inputTodo && toggleButton){
                setItems(
                    items.map((curElem)=>{
                        if(curElem.id === editedItem)
                        {
                            return {...curElem,name:inputTodo,type:inputType}
                        }
                        return curElem
                    })
                )
                setToggle(false)
                setInputTodo();
                setInputType();
                setEditedItem();
        }

        else {
            const newInput = {
                id : new Date().getTime().toString(),
                name:inputTodo,
                type:inputType,
                
            }
            setItems([...items,newInput])
        }
        setInputTodo("")
        setInputType("")
        
    }

    const removeTodo = ()=>{
        setItems([]);
    }

    const editItem = (index)=>{
        const updateTodo = items.find((curElem)=>{
            return curElem.id === index;
        })
        setInputType(updateTodo.type)
        setInputTodo(updateTodo.name)
        setEditedItem(index)
        setToggle(true);
    }
    const deleteItem = (index)=>{
        const updateTodo = items.filter((curElem)=>{
            return curElem.id != index
        })
        setItems(updateTodo);
    }

    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items])

  return <div className='container'>
      
            
                <div className='image'>
                <img src="https://pic.onlinewebfonts.com/svg/img_491208.png" alt="image" className='img_main'/>
                </div>
                <div className = "icons">
                    {editedItem?<button onMouseEnter={hover_on} onMouseLeave={hover_off} onClick={addTodo}>{hover? "EDIT":<i className="far fa-edit" id="edit" ></i>}</button>
                    :<button onMouseEnter={hover_on} onMouseLeave={hover_off} onClick={addTodo}>
                        {hover? "ADD":<i className="fas fa-plus add" ></i>}
                        </button>}
                    
                    <button className="clear" onClick={clearTodo}>Clear All inputs</button>
                    <button className="remove_todos" onClick={removeTodo}>Remove all Todos</button>
                </div>
                <div className='values'>
                    <input type="text" placeholder = "Task" value = {inputTodo} onChange={(event)=>setInputTodo(event.target.value)}></input>
                    <input type="text" placeholder = "Category" value={inputType} onChange={(event)=>setInputType(event.target.value)}></input>
                </div>
                
            

            {/* Display all the todos: */}
            <div className='child'>
                
                    {
                        items.map((curElem)=>{
                            return(<div className='output' key = {curElem.id}>
                                <div className = "todo">
                                <h3>Task : {curElem.name} </h3>
                                <h3>Category : {curElem.type}</h3>
                            </div>
                            <div className='todo_icon'>
                            <i className="far fa-edit" id="edit" onClick={()=>editItem(curElem.id)}></i>
                            <i className="far fa-trash-alt add-btn" id="del" onClick={()=>deleteItem(curElem.id)}></i>
                            </div>
                            </div>
                            );
                        })
                    }
                   
                

            </div>
      
  </div>;
};

export default Todo;
