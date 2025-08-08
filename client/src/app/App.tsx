import '../styles/reset.css';
import { Header } from '@components/Header/Header';
import { Content } from '@components/Content/Content';
import { Footer } from '@components/Footer/Footer';
import { MainLayout } from './MainLayout';
import { AppLoader } from '@/hoc/AppLoader.hoc';

function App() {
  return (
    <MainLayout
      children={
        <AppLoader
          children={
            <>
              <Header />
              <Content />
              <Footer />
            </>
          }
        />
      }
    />
  );
}

export default App;
