import React from 'react';
import './styles.scss';
import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';

AddEditPage.propTypes = {};

function AddEditPage(props) {
    const { photoId } = useParams();
    const isAdd = !photoId;
    const findPhoto = useSelector(state => state.photos.find(photo => photo.id === +photoId))
    const initValues = isAdd ? {
        title: '',
        option: '',
        img: 'https://picsum.photos/300',
        isAdd: isAdd
    } : {
        id: findPhoto.id,
        title: findPhoto.title,
        option: findPhoto.categoryId,
        img: findPhoto.photo,
        isAdd: isAdd
    }

    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo 😎" />

            <div className="photo-edit__form">
                <PhotoForm
                    onSubmit={values => console.log('Form submit: ', values)}
                    initValues={initValues}
                />
            </div>
        </div>
    );
}

export default AddEditPage;