import React from 'react';
import EpisodeDetail from './EpisodeDetail/EpisodeDetail';

const EpisodesList = (props) => {
    const episodes = props.episodes.map((episode)=>{
       return( <EpisodeDetail key={episode._id} episode={episode} deleteEpisode={props.deleteEpisode}/>)
    })
    return(
        <div>
        {episodes}
        </div>
    )
}

export default EpisodesList;