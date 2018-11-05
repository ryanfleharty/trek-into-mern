import React, {Component} from 'react';
import EpisodesList from './EpisodesList/EpisodesList';
import NewEpisode from './NewEpisode/NewEpisode';

export default class EpisodesContainer extends Component {
    constructor(){
        super();
        this.state = {
            episodes: [],
            newEpisode: {
                "title": "",
                "description": "",
                "rating": 5
            }
        }
    }
    componentDidMount(){
        this.getEpisodes().then((response)=>{
            if(response.status === 200){
                this.setState({
                    episodes: response.data
                })
            }
        })
    }
    createEpisode = async (e) => {
        e.preventDefault();
        const newEpisode = await fetch("http://localhost:9001/episodes", {
            method: "POST",
            body: JSON.stringify(this.state.newEpisode),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const newEpisodeParsed = await newEpisode.json();
        if(newEpisodeParsed.status === 200){
            document.getElementById("new-episode-form").reset();
            this.setState({
                episodes: [...this.state.episodes, newEpisodeParsed.data]
            })
        }
    }
    handleNewChange = (e) => {
        console.log(this.state.newEpisode)
        this.setState({
            newEpisode: {
                ...this.state.newEpisode,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }
    getEpisodes = async () => {
        const episodes = await fetch("http://localhost:9001/episodes");
        const episodesParsed = await episodes.json();
        return episodesParsed;
    }
    deleteEpisode = async(id, e) => {
        console.log("DELETING EPISODE " + id);
        const deleteSuccess = await fetch("http://localhost:9001/episodes/" + id, {
            method: "DELETE"
        })
        const deletedParsed = await deleteSuccess.json();
        if(deletedParsed.status === 200){
            this.setState({
                episodes: this.state.episodes.filter((episode)=>{
                    return episode._id !== id
                })
            })
        }
    }
    render(){
        return(
            <div>
                <NewEpisode createEpisode={this.createEpisode} handleNewChange={this.handleNewChange}/>
                <EpisodesList deleteEpisode = {this.deleteEpisode} episodes={this.state.episodes} />
            </div>
        )
    }
}