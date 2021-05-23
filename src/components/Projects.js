const Projects = ({repos, filter, setStorage}) => {
    function onClickHandler(repo, target) {
        setStorage(repo)
        target.disabled = true
    }

    function isFavorite(repo) {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        return favorite.find(element => repo.id === element.id)
    }

    return (
        repos.filter(item => filter === '' || String(item.language) === filter).map(repo => {
                return (
                    <li className="list-group-item" key={repo.node_id}>
                        <img className="rounded" src={repo.owner.avatar_url} alt={repo.owner.id}
                             style={{width: '50px', height: '50px'}}/>
                        <h2>{repo.name.toUpperCase()}</h2>
                        <div>&#11088; {repo.stargazers_count} &#11088; id:{repo.id}</div>
                        <h5>{repo.description}</h5>
                        <a href={repo.html_url}>Link to project</a>
                        <div>Language: <b>{repo.language !== null ? repo.language : 'No language'}</b></div>
                        <button type="button" disabled={isFavorite(repo)} className="btn btn-success mt-3 mb-3"
                                onClick={({target}) => {
                                    onClickHandler(repo, target)
                                }}>Add to favorite
                        </button>
                    </li>
                )
            }
        )
    )
}

export default Projects
