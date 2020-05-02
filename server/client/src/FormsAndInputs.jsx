import React, { Component } from 'react'

export default
class FormsAndInputs extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoURL: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state
        console.log(data);
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        const {videoURL} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='Video URL' value={videoURL} name='videoURL' onChange={this.handleInputChange}/></p>
                    <p><button>Submit</button></p>
                </form>
            </div>
        );
    }
}