import { Button, Label, Modal, Select, Spinner, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AxiosClientFormData, AxiosClientJSON } from "../config/http-client/axios-client";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { customAlert } from "../config/alert/alert";
import * as yup from 'yup';
import AuthContext from "../config/context/auth-context";


export const FormElastic = ({ item }) => {
    const [valuesItem, setValuesItem] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const dispah = useContext(AuthContext);
    const navigate = useNavigate();

   

    const formik = useFormik({
        initialValues: {},
        validationSchema: yup.object().shape({}),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await item?.form?.axios({
                    url: item?.form?.url,
                    method: item?.form?.method,
                    data: values,
                });
                console.log(response.status == 'OK');
                if (response.status == 'OK') {
                    dispah({ type: '/users', payload: response.data })
                    navigate('/', { replace: true });
                } 
                else {
                    throw Error("Error");
                }
               
            } catch (error) {
                console.log(error)
                customAlert(
                    'Registro incorrecto',
                    'Revisa los datos',
                    'error'
                );
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <Button onClick={() => setOpenModal(true)} color="dark" size={'xs'} className="ml-3" style={{ backgroundColor: 'var(--red-3)' }}>Agregar</Button>
            <Modal show={openModal} size="3xl" popup onClose={() => setOpenModal(false)} >
                <form className="space-y-4 md:space-y-6 p-2 pt-3" onSubmit={formik.handleSubmit} id="forms" noValidate encType="multipart/form-data">
                    <Modal.Header ><h3 className="text-2xl font-medium text-gray-900 dark:text-white">{item?.title}</h3></Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">

                            <div className="flex flex-wrap w-full">
                                {item?.data.map((input) => {
                                    if (input.id === "image") {
                                        return (
                                            <div className="w-2/5 m-3" key={input.id}>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={input.id} value={input.text} />
                                                </div>
                                                <input
                                                    onChange={(e) => {
                                                        formik.setFieldValue('image', e.target.files[0]);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    id={input.id}
                                                    placeholder={input.placeholder}
                                                    type="file"
                                                    required
                                                />
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className="w-2/5 m-3" key={input.id}>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={input.id} value={input.text} />
                                                </div>
                                                <TextInput
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    id={input.id}
                                                    placeholder={input.placeholder}
                                                    type={input.type}
                                                    required
                                                />
                                            </div>
                                        );

                                    }

                                })}
                                {item?.select.map((select) => (
                                    <div className="w-2/5 m-3" key={select.id}>
                                        <div className="mb-2 block">
                                            <Label htmlFor={select.id} value={select.text} />
                                        </div>
                                        <Select id={select.id} required  onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} >
                                            {select.data.map(elemento => (
                                                <option key={elemento.id} value={elemento.id} > {elemento.type}</option>
                                            ))}
                                        </Select>
                                    </div>
                                ))}
                                <div className="flex justify-center items-center w-2/5 ml-3  ">
                                    <Button
                                        type="submit"
                                        color="dark"
                                        style={{ backgroundColor: "var(--red-3)" }}
                                        onClick={()=>{
                                            let forms = document.getElementById('forms');
                                            const formsData = new FormData(forms);
                                            formik.setValuesItem(formsData);
                                        }}
                                        className="w-full h-fit"
                                        disabled={formik.isSubmitting && formik.isValid}
                                    >{formik.isSubmitting ? (<Spinner />) :
                                        (<>

                                            Registrar
                                        </>)} </Button>
                                </div>

                            </div>

                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
}