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
                </form>
                <div className="notes-control">
                    <button>Close</button>
                </div>
            </div>
        </div>
    );
}

class Point extends React.Component {
    applyState(base, coord, current, grid) {
        var coorX = coord[0], coorY = coord[1];
        var curX = current[0], curY = current[1];
        var isUndefined = grid[coorX][coorY] === null;
        var isCurrent = curX == coorX && curY == coorY;

        if (isCurrent && isUndefined) base += " current";
        else if (!isCurrent && isUndefined) base += " hidden";
        return base;
    }
    render() {
        const cname = this.applyState(
            'point', 
            this.props.coord, 
            this.props.current, 
            this.props.grid
            );
        return (
            <button
                className={cname}
                onClick={this.props.onClick}
            >x</button>
        );
    }
}

class Grid extends React.Component {
    renderPoint(grid, coord, current, onClick){
        return (
            <Point
                grid={grid}
                current={current}
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
                this.renderPoint(this.props.grid, coord, this.props.current, this.props.onClick)
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
    // TODO: load notes schema 
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
            form: false,
            inputs: '',
            current: [null, null]
        };
    }

    handleClick(coord) {
        console.log(coord);
        var x = coord[0], y = coord[1];

        // activate/deactivate point
        if (this.state.current[0]==x && this.state.current[1]==y) {
            // if current point gets clicked again
            let grid = this.copyGrid(this.state.grid)
            grid[x][y] = null;
            this.setState({
                current: [null, null],
                grid: grid
            });
        }
        else {
            this.setState({current: coord});
        }



        // if (this.state.grid[x][y] === null) {
        //     let grid = this.copyGrid(this.state.grid);
        //     grid[x][y] = {};
        //     this.setState({grid: grid});
        // }
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
                    current={this.state.current}
                    onClick={(coord) => this.handleClick(coord)}
                />
                {this.state.form && <NotesForm/>} 
            </div>
        )
    }
}

export default Pad;