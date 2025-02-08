import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import './photoList.scss';

PhotoList.propTypes = {
    photoList: PropTypes.array,
    onPhotoEditClick: PropTypes.func,
    onPhotoRemoveClick: PropTypes.func,
};

PhotoList.defaultProps = {
    photoList: [],
    onPhotoEditClick: null,
    onPhotoRemoveClick: null,
};

function PhotoList(props) {
    const { photoList, onPhotoEditClick, onPhotoRemoveClick } = props;

    const handleEditClick = (photo) => {
        onPhotoEditClick(photo)
    }

    const handleRemoveClick = (photo) => {
        onPhotoRemoveClick(photo)
    }

    return (
        <Row className='mt-5'>
            {photoList.map(photo => (
                <Col key={photo.title} xs="12" md="6" lg="3">
                    <div className="photo">
                        <img src={photo.photo} alt={photo.title} />

                        <div className="photo__overlay">
                            <h3 className="photo__title">{photo.title}</h3>

                            <div className="photo__actions">
                                <div>
                                    <Button outline size="sm" color="light" onClick={() => handleEditClick(photo)}>
                                        Edit
                                    </Button>
                                </div>

                                <div>
                                    <Button outline size="sm" color="danger" onClick={() => handleRemoveClick(photo)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default PhotoList;