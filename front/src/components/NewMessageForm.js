import React, { useState } from 'react';
import { API_ROOT, HEADERS } from '../constants';

const NewMessageForm = (props) => {
  const [state, setState] = useState({
    text: '',
    conversation_id: props.conversation_id
  });
  
  const handleChange = (e) => {
    setState({ 
      text: e.target.value,
      conversation_id: state.conversation_id 
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(state)
    });
    setState({ 
      text: '',
      conversation_id: state.conversation_id
    });
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <label>New Message:</label>
        <br />
        <input
          type="text"
          value={state.text}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewMessageForm;