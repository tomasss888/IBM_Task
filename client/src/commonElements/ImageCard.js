import { Card } from 'react-bootstrap';

const ImageCard = props => (

    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.data.images.original.url} />
        <Card.Body>
            <Card.Title> {props.data.title} </Card.Title>
        </Card.Body>
    </Card>
);

//<img key={data.id} src={data.images.original.url} alt={data.title} />


export default ImageCard;