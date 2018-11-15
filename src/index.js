import React from 'react';
import './styles.css';

function NotesForm(props) {
    // Behaviors: save event, remove event -> change state 
    return (
        <div className="notes-form">
            <div className="notes-top"></div>
            <div className="notes-bottom">
                <form className="">
                    <label>Drug:</label>
                    <input type="text" />
                    <label>Dosage:</label>
                    <input type="text" />
                    <button>remove</button>
                </form>
                <div className="notes-control">
                    <button>Close</button>
                    <button>Save</button>
                    <button>Clear</button>
                </div>
            </div>
        </div>
    );
}

class Point extends React.Component {
    render() {
        const cname = "point " + this.props.cname;
        return (
            <button
                className={cname}
                onClick={this.props.onClick}
            >x</button>
        );
    }
}

class Grid extends React.Component {
    isPointHidden(coord, grid){
        var x = coord[0], y = coord[1];
        return grid[x][y] === null;
    }
    renderPoint(grid, coord, onClick){
        var cname = this.isPointHidden(coord, grid) ? 'hidden' : '';
        return (
            <Point
                cname={cname}
                coord={coord}
                key={coord}
                onClick={() => onClick(coord)}
            />
        );
    }
    renderLine(li, count, onClick) {
        const line = [];
        for (let i = 0; i < count; i++) {
            let coord = [li, i];
            line.push(
                this.renderPoint(this.props.grid, coord, this.props.onClick)
            );
        }
        return line;
    }
    render() { 
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
    // TODO: render GRID on init 
    newGrid(d) {
        return Array(d[0]).fill(
            Array(d[1]).fill(null)
        );
    }
    constructor(props) {
        super(props);
        var index = 'index' in props ? props.index : [];
        var grid = 'grid' in props ? props.grid : this.newGrid(props.dimensions);
        this.state = {
            dimensions: props.dimensions, //helps to construct new grid
            avatar: props.avatar, //image to lay over grid
            index: index, //quick lookup of populated grid points
            grid: grid, //source of truth
            current: null //which coordinate is currently selected
        };
    }

    handleClick(coord) {
        console.log(coord);
        var x = coord[0], y = coord[1];
        if (this.state.grid[x][y] === null) {
            let grid = this.copyGrid(this.state.grid);
            grid[x][y] = {};
            this.setState({grid: grid});
        }
        // display form and give it state editing functions 
    }

    copyGrid(grid){
        // ensures that nested array is a copy and not reference
        var shallow = grid.slice();
        return shallow.map((arr) => { return arr.slice() });
    }

    

    render() {
        return (
            <div className="pad">
                <Grid
                    grid={this.state.grid}
                    index={this.state.index}
                    onClick={(coord) => this.handleClick(coord)}
                />
                {this.state.form && <NotesForm/>} 
            </div>
        )
    }
}

export default Pad;