import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SweetAlert = withReactContent(Swal);

export const customAlert = (title, text, icon) => {
    return SweetAlert.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText:'Aceptar'
    })
}

export const customAlertCorfirm = (title, timer, icon) => {
    return SweetAlert.fire({
        title,
        timer,
        icon,
       
    })
}
export const customToast = (text , type) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        timer: 1500,
        timerProgressBar: true,
                
      })
    return Toast.fire(text, '', type) 

}
