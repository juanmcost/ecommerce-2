export const successToast = (toast, title, description) => {
    toast({
        title: title,
        description: description,
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
};

export const errorToast = (toast, title, description) => {
    toast({
        title: title,
        status: 'error',
        duration: 2800,
        isClosable: true,
    });
};

export const toastDelete = (toast, title) => {
    toast({
        title: title,
        position: 'top',
        description: 'This product already exist',
        status: 'error',
        duration: 2800,
        isClosable: true,
    });
};

export const toastAdd = (toast, title) => {
    toast({
        title: title,
        position: 'top',
        description: 'Product has been added correctly',
        status: 'success',
        duration: 2800,
        isClosable: true,
    });
};
