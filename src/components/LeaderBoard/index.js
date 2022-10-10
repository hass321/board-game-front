import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import { apis } from "../../api_services/apis";
import { instance } from "../../api_services/index";

const LeaderBoard = ({reload})=>{
    console.log(reload)
    const [players, setPlayers] = useState([]);
    useEffect(()=>{
        instance.get(apis.getAllUser).then((res) => setPlayers(res.data));
    },[reload])
    return (
      <Container>
        <div className="h3">Top 5 Players</div>
        <ListGroup as="ol" numbered>
          {players.map((player, ind) => {
            return (
              <ListGroup.Item key={ind}>
                {player.user}{' '}
                <Badge bg="primary" pill>
                  {player.time} sec
                </Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    );
}

export default LeaderBoard;