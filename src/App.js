
import {useState} from 'react'

import LeaderBoard from './components/LeaderBoard';
import Game from './components/Game';

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Container } from 'react-bootstrap';

function App() {
  const [reload, setReload] = useState(false);
  return (
    <Container>
      <Tabs
        defaultActiveKey="game"
        id="controlled-tab-example"
        onSelect={(k) => setReload(!reload)}
      >
        <Tab eventKey="game" title="Game">
          <Game />
        </Tab>
        <Tab eventKey="leaderBoard" title="Leader Board">
          <LeaderBoard reload={reload} />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;