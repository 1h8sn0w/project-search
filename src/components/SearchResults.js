import {useEffect, useRef, useState} from "react";
import Projects from "./Projects";

const SearchResults = ({setStorage}) => {
    const [results, setResults] = useState('');
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef();
    const selectRef = useRef();

    //https://api.github.com/search/repositories?q=${query}

    useEffect(() => {
        if (!query) return

        const controller = new AbortController()
        const signal = controller.signal

        new Promise((resolve) => setTimeout(resolve, 1000))
            .then(() => {
                setIsLoading(true)
                return fetch(`https://api.github.com/search/repositories?q=${query}`, {method: 'get', signal})
            })
            .then(r => r.json())
            .then(res => {
                setFilter('')
                setResults(res)
                setIsLoading(false)
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.log('Error on fetch! ', err)
                }
            })
        return () => {
            controller.abort()
        }
    }, [query])

    const handleChange = ({target}) => setQuery(target.value)

    function getUniqueList(arr, key) {
        return [...new Map(arr?.map(item => [item[key], item])).values()]
    }

    function onChangeHandler({target}) {
        setFilter(target.value)
    }

    return (
        <div className="container pt-3">
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">GitHub repository name: </span>
            <input
                ref={inputRef}
                value={query}
                placeholder={'project name'}
                onChange={handleChange}
                type="text"
                className="form-control"
            /></div>
            {results.items && <select ref={selectRef} onChange={onChangeHandler} className="form-select mb-3" aria-label="Select language">
                <option value={''}>All languages</option>
                {getUniqueList(results.items, 'language').map(repo => {
                    return <option value={repo.language !== null ? repo.language : 'null' } key={repo.id}>{repo.language !== null ? repo.language : 'No language' }</option>
                })}</select>}
            {isLoading ? <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
                    <span className="visually-hidden">Loading...</span>
                </div> :
                <ul className="list-group mb-3">{results.items && <Projects repos={results.items} filter={filter} setStorage={setStorage}/>}</ul>}
        </div>
    )
}

export default SearchResults
