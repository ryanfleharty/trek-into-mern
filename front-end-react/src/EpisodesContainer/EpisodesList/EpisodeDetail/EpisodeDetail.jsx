import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class EpisodeDetail extends Component{
    constructor(){
        super();
        this.state = {
            show: false
        }
    }
    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }
    render(){
    return(
        <div key={this.props.episode._id}>
            <h5>{this.props.episode.title} {this.props.episode.rating}/5</h5>
            <p>{this.props.episode.description}</p>
            <button onClick={this.props.deleteEpisode.bind(null, this.props.episode._id)}>DELETE</button>
            <Button bsStyle="primary" onClick={this.handleShow}>
            edit this episode
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    )}
}


