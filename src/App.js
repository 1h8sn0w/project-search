import './App.css';
import {useEffect} from "react";
import SearchResults from "./components/SearchResults";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
    const [storage, setStorage] = useLocalStorage('favorite', [])

    useEffect(() => {
        if(localStorage.getItem('favorite') !== null){
            setStorage(JSON.parse(localStorage.getItem('favorite')))
        } else {
            localStorage.setItem('favorite', JSON.stringify([]))
        }
    }, [setStorage])

    useEffect(() => {
            localStorage.setItem('favorite', JSON.stringify(storage))
    }, [storage]);

    function handleChange(newItem) {
        setStorage([...storage, newItem])
    }

    return (
        <div className="App">
            <h1>Github project search</h1>
            {
                storage?.map(item => {
                    return <button key={item.id} type="button" className="btn btn-outline-dark m-1"
                                   data-bs-toggle="tooltip"
                                   data-bs-placement="bottom"
                                   title="Tooltip on bottom">
                        {item.full_name}
                    </button>
                })
            }
            <SearchResults setStorage={handleChange}/>
        </div>
    );
}

export default App;
