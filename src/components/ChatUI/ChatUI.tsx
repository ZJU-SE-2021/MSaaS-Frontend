import * as React from 'react';
import { List, Avatar } from 'antd';
import type { ChatMessageSendEvent, Message } from '@progress/kendo-react-conversational-ui';
import { Chat } from '@progress/kendo-react-conversational-ui';
import '@progress/kendo-theme-bootstrap/dist/all.css';

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

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const ChatUI = () => {
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

  return (
    <div style={{ display: 'flex', flex: '1 1', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flex: '1 1', minWidth: '300px' }}>
        <List
          style={{ display: 'flex', flex: '1 1' }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
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
