import { toast } from 'react-toastify'

export const successToast = (msg, position) => {
    toast.success(msg, {
        position: position || 'bottom-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    })
}

export const errorToast = (msg, position) => {
    toast.error(msg, {
        position: position || 'bottom-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    })
}