import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    // label = Todo text
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault(); // Not to reload the page

    const { label } = this.state;
    this.setState({ label: '' });

    const cb = this.props.onItemAdded || (() => {});
    cb(label);
  };

  render() {
    return (
      <form
        className='bottom-panel d-flex'
        // Submit form by pressing button with type="submit"
        onSubmit={this.onSubmit}
      >
        <input
          type='text'
          className='form-control new-todo-label task-input'
          value={this.state.label} // Makes this element controllable
          onChange={this.onLabelChange}
          placeholder='What needs to be done?'
        />

        <button
          type='submit'
          className='btn btn-outline-secondary submit-btn'
          disabled={!this.props.isFormBtnActive}
        >
          Add Task
        </button>
      </form>
    );
  }
}
