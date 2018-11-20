import React from 'react';
import './styles.css';

function LabelInput (props) {
    return (
        <div className="form-input-group">
            <label>{props.name}</label>
            <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        </div>
    );
}

class Form extends React.Component {
    // Props - template of form inputs
    // Events - onClose
    // Parent constructs template and function to execute onClose
    // render() => render form inputs from template; bind function to event.
    renderInputs(template){
        const inputs = [];
        for (const key in template) {
            if (template.hasOwnProperty(key)) {
                let input = <LabelInput 
                    key={key} 
                    name={key} 
                    value={template[key]} 
                    onChange={this.props.onChange} />;
                inputs.push(input);
            }
        }
        return inputs;
    }

    render () {
        return (
            <form>
                {this.renderInputs(this.props.template)}
            </form>
        );
    }
}

class NotesForm extends React.Component {
    render() {
        return (
            <div className="notes-form">
                <div className="notes-top"></div>
                <div className="notes-bottom">
                    <Form template={this.props.currentValue} onChange={this.props.onChange}/>
                </div>
            </div>
        );
    }
}

class Point extends React.Component {
    // TODO parent should be in charge of calculating state!
    applyState(base, coord, current, grid) {
        var coorX = coord[0], coorY = coord[1];
        var curX = current[0], curY = current[1];
        var isUndefined = grid[coorX][coorY] === null;
        var isCurrent = curX == coorX && curY == coorY;

        if (isCurrent) base += " current";
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
            <div
                className={cname}
                onClick={this.props.onClick}
            ></div>
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
    // Maintains STATE
    // TODO: render GRID on init 
    // TODO: load notes schema 
    newGrid(d) {
        return Array(d[0]).fill(
            Array(d[1]).fill(null)
        );
    }
    constructor(props) {
        super(props);
        var grid = 'grid' in props ? props.grid : this.newGrid(props.dimensions);
        this.state = {
            dimensions: props.dimensions, //helps to construct new grid (SHOULD BE PROP),
            template: props.template, //template for the form (SHOULD BE PROP)
            avatar: props.avatar, //image to lay over grid (SHOULD BE PROP)
            grid: grid, //source of truth
            current: [null, null]
        };
    }

    handleClick(coord) {
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
    }

    copyGrid(grid){
        // ensures that nested array is a copy and not reference
        var shallow = grid.slice();
        return shallow.map((arr) => { return arr.slice() });
    }

    handleInputChange(event) {
        // save input to current grid point
        let x = this.state.current[0], y = this.state.current[1];
        let grid = this.copyGrid(this.state.grid);
        var notes;
        if (grid[x][y] === null) {
            notes = Object.assign({}, this.state.template);
        }
        else notes = grid[x][y];
        notes[event.target.name] = event.target.value;
        grid[x][y] = notes;
        this.setState({grid: grid});
    }

    renderForm() {
        // form's state is a function of the currently selected point
        const x = this.state.current[0] , y = this.state.current[1];
        let currentValue;
        if (this.state.grid[x][y] === null) {
            currentValue = this.state.template;
        }
        else currentValue = this.state.grid[x][y];
        return (
            <NotesForm 
                currentValue={currentValue} 
                onChange={ (e) => this.handleInputChange(e) } 
            />
        );
    }

    render() {
        let hasForm = this.state.current[0] !== null && this.state.current[1] !== null;
        let avatarStyle = {
            backgroundImage: "url("+this.state.avatar+")",
            backgroundRepeat: 'no-repeat'

        };
        return (
            <div className="pad" style={avatarStyle}>
                <Grid
                    grid={this.state.grid}
                    current={this.state.current}
                    onClick={(coord) => this.handleClick(coord)}
                />
                {hasForm && this.renderForm()}
            </div>
        )
    }
}

export default Pad;