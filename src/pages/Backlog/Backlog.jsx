
import React, { useState, useEffect } from 'react';
import Task from '../../components/Task/Task';
import useDataFetching from '../../Hooks/useDataFetching';
import './Backlog.css';

function Backlog(props) {

    const{loading, data, error} = useDataFetching('https://my-json-server.typicode.com/Bryan-source/myAPI/tasks')

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks(data);
    }, [data])


  return (
    <div className='Backlog-wrapper'>
        <h2>Backlog</h2>
        <div className ='nice'>
                {loading || error? (
                    <span>{error || 'Loading...'}</span>

                ):(
                    tasks.map((task) => (
                        <Task 
                            key={task.id}
                            title={task.title}
                            body = {task.body}
                        />
                    ))
                )
                
                }
        </div>
    </div> 
  ); 
}

export default Backlog;