import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useState } from 'react';

import { sendLogoutRequest, editUser } from '../store/user';

const useUserEdit = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const alertDelete = () => {
        swal({
            title: 'Delete',
            text: 'Surely you want to delete your account?',
            icon: 'warning',
            buttons: ['No', 'yes'],
        }).then((resp) => {
            if (resp) {
                axios.delete(`api/user/profile/${user._id}`).then(() => {
                    axios
                        .get('/api/auth/logout')
                        .then(({ data }) => {
                            dispatch(sendLogoutRequest(data));
                            navigate('/home');
                        })
                        .catch((err) => ({ err: err.message }));
                });
            }
        });
    };

    const handleModify = () => {
        const input = {
            id: user._id,
            props: {
                email: email === '' ? user.email : email,
                username: username === '' ? user.username : username,
                fullname: fullname === '' ? user.fullname : fullname,
                phone: phone === '' ? user.phone : phone,
                country: country === '' ? user.country : country,
                city: city === '' ? user.city : city,
                address: address === '' ? user.address : address,
            },
        };

        dispatch(editUser(input));
    };

    return {
        user,
        handleModify,
        alertDelete,
        setAddress,
        setEmail,
        setUsername,
        setFullname,
        setPhone,
        setCountry,
        setCity,
    };
};

export default useUserEdit;
