import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import {HeartTwoTone, SmileTwoTone} from "@ant-design/icons";

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message="Welcome!"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Medical System as a Service <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
    </PageContainer>
  );
};
