import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from "../../utils";
import { useContext } from 'react';
import CryproContext from '../../context/crypto-context';

const siderStyle = {
   padding: '1rem',
};

export default function AppSider() {
   const { assets } = useContext(CryproContext)

   return (
      <Layout.Sider width="25%" style={siderStyle}>
         {assets.map(asset => (
            <Card key={asset.id} style={{ marginBottom: '1rem' }}>
               <Statistic
                  title={capitalize(asset.id)}
                  value={asset.totalAmount}
                  precision={2}
                  valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                  prefix={asset.grow ? <ArrowUpOutlined /> : < ArrowDownOutlined />}
                  suffix="$"
               />
               <List
                  size='small'
                  dataSource={[
                     { title: 'Total Profit', value: asset.totalProfit, withTag: true },
                     { title: 'Asset Amount', value: asset.amount, isPlane: true },
                     // { title: 'Difference', value: asset.growPercent },
                  ]}
                  renderItem={(item) => (
                     <List.Item >
                        <span>{item.title}</span>
                        <span>
                           {item.withTag &&
                              <Tag color={asset.grow ? 'green' : 'red'}>
                                 {asset.growPercent}%
                              </Tag>}
                           {item.isPlane && item.value}
                           {item.isPlane &&
                              <Typography.Text
                                 type={asset.grow ? 'succsess' : 'danger'}>
                                 {item.value.toFixed(2)}$
                              </Typography.Text>}
                        </span>
                     </List.Item>
                  )}
               />
            </Card>
         ))}
      </Layout.Sider>
   )
}