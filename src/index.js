import React from 'react';
import './styles.css';

function Point(props) {
    return (
        <button 
            className="point hidden"
            onClick={props.onClick}
        >x</button>
    );
}

class Grid extends React.Component {
    renderLine(li, count, onClick) {
        const line = [];
        for (let i = 0; i < count; i++) {
            let coord = [li, i];
            line.push(
                <Point 
                    coord={coord} 
                    key={i} 
                    onClick={() => onClick(coord)}
                />
            );
        }
        return line;
    }
    render () {
        const lines = this.props.grid.map((line, li) => {
            return (
                <div className="line" key={li}>
                    {this.renderLine(
                        li, 
                        line.length, 
                        this.props.onClick 
                    )}
                </div>
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

    handleClick(coord) {
        console.log(coord);

    }

    render(){
        return (
            <div className="pad">
                <Grid 
                    grid={this.state.grid}
                    onClick = {(coord) => this.handleClick(coord)}
                />
            </div>
        )
    }
}

export default Pad;