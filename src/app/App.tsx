import '../styles/reset.css';
import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { Footer } from '../components/Footer/Footer';
import { MainLayout } from './MainLayout';

function App() {
  return (
    <MainLayout
      children={
        <>
          <Header />
          <Content />
          <Footer />
        </>
      }
    />
  );
}

export default App;
