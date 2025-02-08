import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';

MainPage.propTypes = {};

function MainPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const photos = useSelector(state => state.photos);

    const handlePhotoEditClick = (photo) => {
        history.push(`/photos/${photo.id}`);
    }

    const handlePhotoRemoveClick = (photo) => {
        const action = removePhoto(photo.id);
        dispatch(action);
    }

    return (
        <div className="photo-main">
            <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

            <Container className="text-center mt-3">
                <Link to="/photos/add">Add new photo</Link>

                <PhotoList
                    photoList={photos}
                    onPhotoEditClick={handlePhotoEditClick}
                    onPhotoRemoveClick={handlePhotoRemoveClick}
                />
            </Container>
        </div>
    );
}

export default MainPage;