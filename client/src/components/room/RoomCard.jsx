/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Col key={room.uid} className="mb-4" xs={12}>
      <Card className="cardi">
        <Card.Body className="cardi flex-wrap align-items-center">
          <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-room/${room.uuid}`}>
              <Card.Img
                variant="top"
                src={room.photo}
                alt="Room Photo"
                style={{
                  width: "200px",
                  height: "150px",
                  marginBottom: "10px",
                }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.room_type}</Card.Title>
            <Card.Title className="room-price">
              {room.room_price} / night
            </Card.Title>
            <Card.Text>
              Some room information goes here for the guest to read through
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.uuid}`} className="btn btn-hotel">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
