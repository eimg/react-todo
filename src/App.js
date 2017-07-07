import React, { Component } from 'react';
import './App.css';

class TodoItem extends Component
{
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange() {
        this.props.toggle( this.props.id );
    }

    handleDelete() {
        this.props.remove( this.props.id );
    }

    render() {
        return (
            <li>
                <input type="checkbox"
                    checked={this.props.status}
                    onChange={this.handleChange} />
                {this.props.status ? (
                    <s>{this.props.subject}</s>
                ) : (
                    this.props.subject
                )}

                <a href='#' onClick={this.handleDelete}>&times;</a>
            </li>
        )
    }
}

class NewTodo extends Component
{
    constructor() {
        super();

        this.state = {
            subject: ''
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            subject: e.target.value
        })
    }

    handleAdd(e) {
        var subject = this.state.subject;
        this.props.add( subject );

        this.setState({
            subject: ''
        });
    }

    render() {
        return (
            <div className='newtodo'>
                <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.subject} />
                <button onClick={this.handleAdd}>+</button>
            </div>
        )
    }
}

class TodoList extends Component
{
    constructor() {
        super();

        this.state = {
            items: [
                { subject: 'Something to do', status: 0 },
                { subject: 'Another thing to do', status: 0 },
                { subject: 'Yet another thing to do', status: 1 },
                { subject: 'More thing to do', status: 0 }
            ]
        }

        this.add = this.add.bind(this);
        this.toggle = this.toggle.bind(this);
        this.remove = this.remove.bind(this);
    }

    add(subject) {
        var items = this.state.items;
        items.push({
            subject: subject,
            status: 0
        });
        this.setState({ items });
    }

    toggle(index) {
        var items = this.state.items;
        items[index].status = !items[index].status;
        this.setState({ items });
    }

    remove(index) {
        var items = this.state.items;
        delete items[index];
        this.setState({ items });
    }

    render() {
        var self = this;

        return (
            <div>
                <ul>
                    {this.state.items.map(function(item, index) {
                        return (
                            <TodoItem
                                key={index}
                                id={index}
                                status={item.status}
                                subject={item.subject}
                                toggle={self.toggle}
                                remove={self.remove} />
                        )
                    })}
                </ul>

                <NewTodo add={self.add} />
            </div>
        )
    }
}

export default TodoList;
