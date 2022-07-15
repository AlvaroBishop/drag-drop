import React, { useEffect, useState } from 'react';
import Lane from "../../components/Lane/Lane";
import { Loading } from '../../components/Loading/Loading';
import  useDataFetching  from '../../Hooks/useDataFetching';
import "./Board.css";

const lanes = [
    {id:1,title: 'To Do'},
    {id:2,title: 'In Progress'},
    {id:3,title: 'Review'},
    {id:4,title: 'Done'},
]

const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
}

const onDragOver = (e) => {
    e.preventDefault();
}



function Board(props) {
    
    const {loading, data, error } = useDataFetching('https://my-json-server.typicode.com/Bryan-source/myAPI/tasks')

    const [tasks, setTasks] = useState([])
    

    useEffect(() => {
        setTasks(data);
    }, [data])

    function onDrop(e, laneId) {
        const id = e.dataTransfer.getData('id')
        
        const updatedTasks = tasks.map((task) => {
            if(task.id.toString() === id) {
                task.lane = laneId;
                console.log(task.id)
            }
            return task;
        })
        setTasks(updatedTasks)
    }


    {
        if(loading) return <Loading />
    }

    return (
        <div className='Board-wrapper'>
            {
                lanes.map((lane) => (
                    <Lane 
                        key={lane.id}
                        laneId={lane.id} 
                        title={lane.title}
                        loading={loading}
                        error={error}
                        tasks={tasks.filter((task) => task.lane === lane.id)}
                        onDragStart={onDragStart}
                        onDragOver = {onDragOver}
                        onDrop={onDrop}
                    />
                ))
            }
        </div>
    );
}

export default Board;