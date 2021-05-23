import './App.css';
import Favorite from "./components/Favorite";
import SearchResults from "./components/SearchResults";

function App() {
    return (
        <div className="App">
            <h1>Github project search</h1>
            <Favorite/>
            <SearchResults/>
        </div>
    );
}

export default App;
