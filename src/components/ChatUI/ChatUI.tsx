import * as React from 'react';
import { Menu } from 'antd';
import type { ChatMessageSendEvent, Message } from '@progress/kendo-react-conversational-ui';
import { Chat } from '@progress/kendo-react-conversational-ui';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const user = {
  id: 1,
  avatarUrl: 'https://via.placeholder.com/24/008000/008000.png',
};

const bot = { id: 0 };

const initialMessages: Message[] = [
  {
    author: bot,
    suggestedActions: [
      {
        type: 'reply',
        value: 'Oh, really?',
      },
      {
        type: 'reply',
        value: 'Thanks, but this is boring.',
      },
    ],
    timestamp: new Date(),
    text: "Hello, this is a demo bot. I don't do much, but I can count symbols!",
  },
];

// @ts-ignore
const ChatUI = ({ setMsgCount }) => {
  const [messages, setMessages] = React.useState(initialMessages);

  // @ts-ignore
  const countReplayLength = (question) => {
    // @ts-ignore
    const { length } = question;
    // @ts-ignore
    const answer = `${question} contains exactly ${length} symbols.`;
    return answer;
  };

  const addNewMessage = (event: ChatMessageSendEvent) => {
    const botResponse = { ...event.message };
    botResponse.text = countReplayLength(event.message.text);
    botResponse.author = bot;
    setMessages([...messages, event.message]);
    setTimeout(() => {
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    setMsgCount(0);
  }, []);

  return (
    <div style={{ display: 'flex', flex: '1 1', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flex: '1 1' }}>
        <Menu>
          <Menu.Item key="1" icon={<UserOutlined />}>
            User 1
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            User 2
          </Menu.Item>
        </Menu>
      </div>
      <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        placeholder={'Type a message...'}
        width={400}
      />
    </div>
  );
};

export default ChatUI;
