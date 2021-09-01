import './App.css';
import Header from './components/Header/Header'
import Daily from './components/Header/Daily-Weather/Daily'
import Taskbar from './components/Header/Taskbar/Taskbar'
import Background from './components/Header/Background/Background';
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <div class="App-header">
      <Taskbar></Taskbar>
      <Header></Header>
      <Daily></Daily>
    </div>

  );
}

export default App;
