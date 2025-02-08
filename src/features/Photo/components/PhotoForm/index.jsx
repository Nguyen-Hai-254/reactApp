import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Select from 'react-select';
import { Button, FormGroup, Input, Label, Form } from 'reactstrap';
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import './index.scss'
import * as yup from "yup"
import { useDispatch } from 'react-redux';
import { addPhoto, editPhoto } from 'features/Photo/photoSlice';
import { useHistory } from "react-router-dom"

PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
    onSubmit: null,
}



function PhotoForm(props) {
    const { initValues } = props;
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState(initValues.title);
    const [option, setOption] = useState(initValues.option);
    const [img, setImg] = useState(initValues.img);
    const [error, setError] = useState();

    const handleRandomPhoto = () => {
        const randomId = Math.trunc(Math.random() * 2000);
        setImg(`https://picsum.photos/id/${randomId}/300/300`)
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required!'),
        option: yup.number().required('Category is required!'),
        img: yup.string().required('Image is required!')
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initValues.isAdd) {
                await validationSchema.validate({ title, option, img })
                const id = 100 + Math.trunc(Math.random() * (99999 - 10000));
                const action = addPhoto({ id, title, option, img })
                dispatch(action)
            }
            else {
                await validationSchema.validate({ title, option, img })
                const action = editPhoto({ id: initValues.id, title, option, img })
                dispatch(action);
            }

            history.push('/photos')
        } catch (e) {
            setError(e.message);
        }
    }

    return (

        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="titleId">Title</Label>
                <Input name="title" id="titleId" placeholder="Eg: Wow nature ..." value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Label for="categoryId">Category</Label>
                <Select
                    id="categoryId"
                    name="categoryId"
                    onChange={(e) => setOption(e.value)}
                    placeholder="What's your photo category?"
                    defaultValue={PHOTO_CATEGORY_OPTIONS[option - 1]}
                    options={PHOTO_CATEGORY_OPTIONS}
                />
            </FormGroup>

            <FormGroup>
                <Label for="categoryId">Photo</Label>

                <div><Button type="button" outline color="primary" onClick={handleRandomPhoto}>Random a photo</Button></div>
                <div>
                    <img className='img' width="200px" height="200px" src={img} alt="Ooops .... not found. Please click random again!" />
                </div>
            </FormGroup>
            <b>{error}</b>

            <FormGroup>
                <Button type="submit" onSubmit={(e) => handleSubmit(e)} color="primary">
                    {initValues.isAdd ? 'Add to album' : 'Update your photo'}
                </Button>
            </FormGroup>
        </Form>
    );
}

export default PhotoForm;