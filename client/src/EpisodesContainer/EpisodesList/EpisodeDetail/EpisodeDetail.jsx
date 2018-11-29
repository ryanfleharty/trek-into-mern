import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class EpisodeDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            updatedEpisode: {
                title: this.props.episode.title,
                description: this.props.episode.description,
                rating: this.props.episode.rating,
                _id: this.props.episode._id
            }
        }
    }
    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }
    handleEditChange = (e) => {
        this.setState({
            updatedEpisode: {
                ...this.state.updatedEpisode,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleEditSubmit = (e) => {
        e.preventDefault();
        this.handleClose();
        this.props.updateEpisode(this.state.updatedEpisode);
    }
    render(){
    return(
        <div key={this.props.episode._id}>
            <h5>{this.props.episode.title} {this.props.episode.rating}/5</h5>
            <p>uploaded by: {this.props.episode.creator.username}</p>
            <p>{this.props.episode.description}</p>
            <button onClick={this.props.deleteEpisode.bind(null, this.props.episode._id)}>DELETE</button>
        <Button bsStyle="primary" onClick={this.handleShow}>
            edit this episode
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.episode.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleEditSubmit}>
                Title: <input type="text" name="title" placeholder={this.props.episode.title} onChange={this.handleEditChange}/><br/>
                Description: <input type="text" name="description" placeholder={this.props.episode.description} onChange={this.handleEditChange}/><br/>
                Rating: <input type="number" name="rating" min="1" max="5" placeholder={this.props.episode.rating} onChange={this.handleEditChange}/><br/>
                <input type="submit"/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    )}
}


