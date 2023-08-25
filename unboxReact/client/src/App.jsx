import { EthProvider } from "./contexts/EthContext";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          
          <Header />
          <Setup />
          
          <Demo />
          
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
