import { Button, Switch } from 'antd';
import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import { UserMediaError, useUserMedia } from '@vardius/react-user-media';
import Video from '@/components/VideoUI/Video';

const VideoUI = (props: { appointmentID: string }) => {
  const [mute, setMute] = useState(false);
  const [peer, setPeer] = useState<Peer>();
  const [connection, setConnection] = useState<Peer.DataConnection>();
  const [thisCall, setCall] = useState<Peer.MediaConnection>();
  const { stream, error } = useUserMedia({ audio: true, video: true });
  const [peerStream, setPeerStream] = useState<MediaStream>();

  const sessionId = `Physician_${props.appointmentID}`;
  const userId = `User_${props.appointmentID}`;

  const onStart = () => {
    if (stream) {
      const userData = {
        sender_name: '医生',
        sender_avatar:
          'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
        receiver_name: 'Receiver Name',
        receiver_avatar:
          'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
      };
      // @ts-ignore
      const peerConn = peer.connect(userId);
      peerConn.on('open', () => {
        // send a message to the other
        // @ts-ignore
        userData.sessionId = sessionId;
        const data = {
          type: 'START_CALL',
          userData,
        };
        peerConn.send(data);
      });
      setConnection(peerConn);

      const call = peer?.call(userId, stream);
      call?.on('stream', setPeerStream);
      // Handle when the call finishes
      call?.on('close', () => {
        // eslint-disable-next-line no-alert
        alert('The video call has finished');
      });
      setCall(call);
    }
  };

  const onStop = () => {
    connection?.send({ type: 'END_CALL', sessionId });
    thisCall?.close();
  };

  useEffect(() => {
    const newPeer = new Peer(sessionId, {
      host: 'msaas.app.ncj.wiki',
      path: '/peerjs',
      key: 'msaas_peerjs',
    });
    newPeer.on('open', () => console.log(newPeer.id));
    newPeer.on('call', (call) => {
      // eslint-disable-next-line no-restricted-globals,no-alert
      const acceptsCall = confirm('Video call incoming, do you want to accept it ?');

      if (acceptsCall) {
        // Answer the call with your own video/audio stream
        // @ts-ignore
        call.answer(stream);

        // Receive data
        call.on('stream', setPeerStream);

        // Handle when the call finishes
        call.on('close', () => {
          // eslint-disable-next-line no-alert
          alert('The video call has finished');
        });
      } else {
        // eslint-disable-next-line no-console
        console.log('Call denied !');
      }
    });
    newPeer.on('connection', (peerConn) => {
      peerConn.on('open', () => {
        peerConn.on('data', (data: any) => {
          // the other person call to you
          if (data.type === 'START_CALL') {
            // eslint-disable-next-line no-restricted-globals,no-alert
            const acceptsCall = confirm('Video call incoming, do you want to accept it ?');
            if (acceptsCall) {
              peerConn.send({ type: 'ACCEPT_CALL', sessionId });
              if (stream) {
                const call = peer?.call(userId, stream);
                call?.on('stream', setPeerStream);
                // Handle when the call finishes
                call?.on('close', () => {
                  // eslint-disable-next-line no-alert
                  alert('The video call has finished');
                });
                setCall(call);
              }
            } else {
              peerConn.send({ type: 'REJECT_CALL', sessionId });
            }
          }
        });
      });
    });
    setPeer(newPeer);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button type="primary" size="large" style={{ margin: '10px' }} onClick={onStart}>
          发起通话
        </Button>
        <Switch
          checkedChildren="取消静音"
          unCheckedChildren="开启静音"
          defaultChecked={mute}
          onChange={setMute}
          style={{ margin: '10px' }}
        />
        <Button danger type="primary" size="large" style={{ margin: '10px' }} onClick={onStop}>
          结束通话
        </Button>
      </div>
      {error ? (
        <UserMediaError error={error} />
      ) : (
        <Video stream={stream} autoPlay muted width="400" height="300" />
      )}
      <Video stream={peerStream} autoPlay muted={mute} width="400" height="300" />
    </div>
  );
};

export default VideoUI;
