import {useEffect} from "react";
import './App.css';
import SearchResults from "./components/SearchResults";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
    const [storage, setStorage] = useLocalStorage('favorite', [localStorage.getItem('favorite') !== null
        ? JSON.parse(localStorage.getItem('favorite'))
        : localStorage.setItem('favorite', JSON.stringify([]))])


    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(storage))
    }, [storage]);

    function handleChange(newItem) {
        setStorage([...storage, newItem])
    }

    function handleDelete(item) {
        let arr = JSON.parse(localStorage.getItem('favorite'))
        setStorage(arr.filter(i => i.id !== item.id))
    }


    return (
        <div className="App">
            <h1>Github project search</h1>
            {
                storage?.map(item => {
                    return <button key={Math.random()} type="button" className="btn btn-outline-dark m-1"
                                   data-bs-toggle="tooltip"
                                   data-bs-placement="bottom"
                                   title="Double click to delete"
                                   onDoubleClick={() => handleDelete(item)}>
                        {item.full_name}
                    </button>
                })
            }
            <SearchResults setStorage={handleChange}/>
        </div>
    );
}

export default App;
