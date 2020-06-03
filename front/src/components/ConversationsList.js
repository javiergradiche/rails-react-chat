import React, { useState, useEffect } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cables';

const ConversationsList = () => {
  const [state, setState] = useState({
    conversations: [],
    activeConversation: null
  });

  useEffect(() => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => setState({ conversations }));
  }, []);

  const handleClick = id => {
    setState({ 
      activeConversation: id,
      conversations: conversations
    });
  };

  const handleReceivedConversation = (response) => {
    const { conversation } = response;

    setState({
      activeConversation: state.activeConversation,
      conversations: [...state.conversations, conversation]
    });
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    const conversations = [...state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    setState({ 
      activeConversation: state.activeConversation, 
      conversations: conversations 
    });
  };

  const { conversations, activeConversation } = state;

  return (
    <div className='conversationList'>
      <ActionCableConsumer
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={ handleReceivedConversation }
      />
      { conversations.length ? (
          <Cable
            conversations={ conversations }
            handleReceivedMessage={handleReceivedMessage}
          />
        ) : (
          null
        )
      }
      <h2>Conversations</h2>
      <ul>{ mapConversations(conversations, handleClick)}</ul>
      <NewConversationForm />
      { activeConversation ? (
          <div>
            <span>Active:&nbsp;{ activeConversation }</span>
            <MessagesArea
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
            />
          </div>
        ) : (
          null
        )
      }
    </div>
  )
}

export default ConversationsList;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        { conversation.title }
      </li>
    );
  });
};