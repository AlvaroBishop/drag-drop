import React, {useEffect, useState} from 'react'

export const useDataFetching = (dataSource) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState();


    useEffect(() => {
        async function fetchData() {
          try {
              const tasks = await fetch(dataSource);
              const result = await tasks.json();
  
              if(result)
              {
                setTimeout(() => {
                    setLoading(false);
                },1000)
                    setData(result);
                    
              }
          } catch (error) {
                setTimeout(() => {
                    setLoading(false);
                },1000)
                setError(error.error)
          }
        }
  
        fetchData();
      
      
      }, [])
    return {
        loading,
        data,
        error
    }
}

export default useDataFetching;
