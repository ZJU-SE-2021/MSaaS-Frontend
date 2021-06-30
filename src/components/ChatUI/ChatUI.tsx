import * as React from 'react';
import type { ChatMessageSendEvent, Message } from '@progress/kendo-react-conversational-ui';
import { Chat } from '@progress/kendo-react-conversational-ui';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const user = {
  id: 1,
  avatarUrl: 'https://placeimg.com/24/24/people',
};

const bot = { id: 0 };

const initialMessages: Message[] = [];

// @ts-ignore
const ChatUI = ({ appointmentId }) => {
  const [messages, setMessages] = React.useState(initialMessages);
  const [connection, setConnection] = useState<signalR.HubConnection>();

  const addNewMessage = (event: ChatMessageSendEvent) => {
    setMessages([...messages, event.message]);
    // @ts-ignore
    connection
      .invoke('SendMessageToUser', {
        AppointmentId: appointmentId,
        Message: event.message.text,
      })
      .then()
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://msaas.app.ncj.wiki/api/hubs/chat')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Debug)
      .build();
    setConnection(hubConnection);

    hubConnection
      .start()
      // eslint-disable-next-line no-console
      .then(() => console.log('Connection started!'))
      // eslint-disable-next-line no-console
      .catch((err) => console.log('Error while establishing connection', err));
    hubConnection.on('ReceiveMessage', ({ message, time }) => {
      const doctorResponse = {
        author: bot,
        timestamp: new Date(Date.parse(time)),
        text: message,
      };
      setMessages((oldMessages) => [...oldMessages, doctorResponse]);
    });
  }, []);

  return (
    <Chat
      user={user}
      messages={messages}
      onMessageSend={addNewMessage}
      placeholder={'Type a message...'}
      width={400}
    />
  );
};

export default ChatUI;
