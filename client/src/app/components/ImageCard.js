import { Card, Row, Spinner, Col } from 'react-bootstrap';
import Fancybox from "../functions/fancybox";

const ImageCard = props => (
    
    <Fancybox options={{ infinite: false }}>
        <Row className="my-2" >
            {(!props.isInitiated || !props.error === null) ? <p></p> : (!props.isLoaded) ? <div className="d-flex justify-content-center"><Spinner animation="border" /></div> : (props.items.map((data) => (
                <Col key={data.id}>
                    <Card 
                    style={{ width: '18rem' }}
                        data-fancybox="gallery"
                        data-src={data.images.original.url}
                    >
                        <Card.Img variant="top" src={data.images.original.url} />
                        <Card.Body>
                            <Card.Title> {data.title} </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            )))}
        </Row>
    </Fancybox>
);

export default ImageCard;