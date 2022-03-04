import "./App.css";
import PowerBar from "./components/PowerBar";
import Table from "./components/Table";

function App() {
  return (
    <div className="p-10 bg-slate-600 h-screen">
      <PowerBar />
      <Table />
    </div>
  );
}

export default App;
