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
            credentials: 'include',
            body: JSON.stringify(this.state.newEpisode),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const newEpisodeParsed = await newEpisode.json();
        console.log(newEpisodeParsed);
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
        const episodes = await fetch("http://localhost:9001/episodes", {
            credentials: 'include'
        });
        const episodesParsed = await episodes.json();
        console.log(episodesParsed);
        return episodesParsed;
    }
    deleteEpisode = async(id, e) => {
        console.log("DELETING EPISODE " + id);
        const deleteSuccess = await fetch("http://localhost:9001/episodes/" + id, {
            method: "DELETE",
            credentials: 'include'
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
    updateEpisode = async (episodeData) => {
        console.log(episodeData);
        const updatedEpisode = await fetch('http://localhost:9001/episodes/' + episodeData._id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(episodeData)
        })
        const response = await updatedEpisode.json();
        console.log(response);
        this.setState({
            episodes: this.state.episodes.map((episode)=>{
                return episode._id === response.data._id ? response.data : episode
            })
        })
    }
    render(){
        return(
            <div>
                <NewEpisode createEpisode={this.createEpisode} handleNewChange={this.handleNewChange}/>
                <EpisodesList updateEpisode={this.updateEpisode} deleteEpisode = {this.deleteEpisode} episodes={this.state.episodes} />
            </div>
        )
    }
}