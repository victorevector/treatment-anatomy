import React from 'react';
import './styles.css';

// A grid is made up of many equidistant points.
// A point is clickable and will reveal itself when clicked
// An avatar is an image
// A pad lays an avatar over the grid and lines them up properly. 
// a pad knows the state and can export it

// How does a parent component become aware of events that happen on its children? If the parent passes a function to the child, then the child can affect variables within the parent (closure)

// How does component get rendered with pre-defined state? Constructor 

// How does this component export state? add method that returns this.state.history.pop()

// How does this component communicate with a backend? (optional) how do you wire up a component to a backend api?

// State: an array that represents the grid ; index = positon; value = on/off

function Point(props) {
    return (
        <button 
            className="point"
            onClick={()=>{console.log(props.coord)}}
        ></button>
    );
}

class Grid extends React.Component {
    renderLine(li, count) {
        const line = [];
        for (let i = 0; i < count; i++) {
            let coord = li + '-' + i;
            line.push(<Point coord={coord} key={i} />);
        }
        return line;
    }
    render () {
        const lines = this.props.grid.map((line, li) => {
            return (
                <div className="line" key={li}>{this.renderLine(li, line.length)}</div>
            )
        })
        return (
            <div className="grid">{lines}</div>
        )

    }
}

class Pad extends React.Component {
    // Requires 4 arguments: 
        // dimensions: [h,v]
        // avatar: {image_url: str, dimensions: [w,h]}
        // notes: {schema}
        // state (optional): [[notes, ...], ...] 
        // index (optional): [[x,y]]
    // Renders grid with functionalities:
        // Event: user clicks on point
            // Display popover with notes schema (pointID)
                // Save automatically
                // Clear manually
            // Write to state
            // Render Grid
        // Index: user clicks on indexed point
            // Display popover with notes schema (pointID)
    newGrid(d) {
        return Array(d[0]).fill(
            Array(d[1]).fill(null)
        );
    }
    constructor(props) {
        super(props);
        let index = 'index' in props ? props.index : null;
        let grid = 'grid' in props ? props.grid : this.newGrid(props.dimensions);
        this.state = {
            dimensions: props.dimensions,
            avatar: props.avatar,
            index: index,
            grid: grid
        };
    }

    handleClick(d) {
    }

    render(){
        return (
            <div className="pad">
                <Grid grid={this.state.grid} />
            </div>
        )
    }
}

export default Pad;