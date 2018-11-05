import React from 'react';

const NewEpisode = (props) => {
    return(
        <form id="new-episode-form" onSubmit={props.createEpisode}>
            title: <input type="text" name="title" onChange={props.handleNewChange}/>
            description: <input type="text" name="description" onChange={props.handleNewChange}/>
            rating: <input type="number" min="1" max="5" name="rating" onChange={props.handleNewChange}/>
            <input type="submit" value="generate episode"/>
        </form>
    )
}

export default NewEpisode;