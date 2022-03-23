import { Card, Spinner, Col } from 'react-bootstrap';
import Fancybox from "../../functions/fancybox";
import "./ImageCard.css"
import React, { useState, useEffect, useRef } from "react";

const ImageCard = props => {

    var splitItems = chunkify(props.items, 4, true)

    return (
        <Fancybox options={{ infinite: false }}>
            <div className="g-4 d-flex align-items-top image-container" >
                {(!props.isInitiated || !props.error === null) ? <p></p> : (!props.isLoaded) ? <div className="justify-content-center spinner"><Spinner animation="border" /> </div>: splitItems.map((data, index) => (
                    <>
                        <Col className='GifList'>
                            <div className="column">
                                <CardMain
                                    items={data}
                                >
                                </CardMain>
                            </div>
                        </Col>
                    </>
                ))}
            </div>
        </Fancybox>
    );
}

const CardMain = props => {

    return (
        <>
            {props.items.map((data, index) =>

                <Card
                    key={index}
                    style={{ width: '18rem' }}
                    data-fancybox="gallery"
                    data-src={data.images.original.url}
                    variant="top"
                >
                    <Card.Img key={index} variant="top" src={data.images.original.url} />

                    <Card.Body>
                        <Card.Title> {data.title} </Card.Title>
                    </Card.Body>

                </Card>

            )}
        </>
    )

}

//splits object (a - object) into chunks (n - how many chunks to split)
function chunkify(a, n, balanced) {

    if (n < 2)
        return [a];

    var len = a.length,
        out = [],
        i = 0,
        size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
}

export default ImageCard;