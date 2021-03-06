import classNames = require("classnames");
import * as React from 'react';


interface ITodoTextInputProps {
    onSave: (text:string)=>void;
    text?: string;
    placeholder?: string;
    editing?: boolean;
    newTodo?: boolean;
}
interface ITodoTextInputState {
    text: string;
}

class TodoTextInput extends React.Component<ITodoTextInputProps, ITodoTextInputState> {
    constructor(props: ITodoTextInputProps) {
        super(props);
        this.state = {
            text: this.props.text || ''
        };
    }

    handleSubmit(e:any) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave( text);
            if (this.props.newTodo) {
                this.setState({ text: '' });
            }
        }
    }

    handleChange(e: any) {
        this.setState({ text: e.target.value });
    }

    handleBlur(e: any) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        return (
            <input className={
                classNames({
                    edit: this.props.editing,
                    'new-todo': this.props.newTodo
                })}
                   type="text"
                   placeholder={this.props.placeholder}
                   autoFocus={true}
                   value={this.state.text}
                   onBlur={this.handleBlur.bind(this)}
                   onChange={this.handleChange.bind(this)}
                   onKeyDown={this.handleSubmit.bind(this)}

            />
        );
    }
}


export default TodoTextInput;
