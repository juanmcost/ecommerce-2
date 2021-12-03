import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import { errorToast, successToast } from '../utils/toastMessages.js';

const useAdminUserManager = () => {
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(false);

    const toast = useToast();

    const changeRollUsers = async (id, isAdmin) => {
        try {
            if (isAdmin) {
                const { status } = await axios.put(`/api/user/admin/unset/${id}`);
                if (status === 201) successToast(toast, 'Admin removed', 'Operation completed successfully');
                return setAdmin(true);
            }
            const { status } = await axios.put(`/api/user/admin/set/${id}`);
            if (status === 201) successToast(toast, 'New Admin', 'Operation completed successfully');
            return setAdmin(true);
        } catch (err) {
            errorToast(toast, 'Error', 'Failed on set admin');
        }
    };

    const _handleDelete = async (id) => {
        try {
            const { status } = await axios.delete(`/api/user/${id}`);
            if (status === 204) successToast(toast, 'User Deleted', 'Operation completed successfully');
        } catch (error) {
            errorToast(toast, 'Error at Delete');
        }
    };

    useEffect(() => {
        axios.get('/api/user').then(({ data }) => setUsers(data));
        setAdmin(false);
    }, [admin]);

    return { _handleDelete, changeRollUsers, users, setUsers };
};

export default useAdminUserManager;
