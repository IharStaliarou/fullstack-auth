import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import './styles/reset.css';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}></Header>
      <Content style={contentStyle}></Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
}

export default App;
