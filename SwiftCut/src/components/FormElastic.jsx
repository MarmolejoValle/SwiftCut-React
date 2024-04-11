import { Button, Label, Modal, Select, Spinner, TextInput, Textarea } from "flowbite-react";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AxiosClientFormData, AxiosClientJSON } from "../config/http-client/axios-client";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { customAlert, customAlertCorfirm } from "../config/alert/alert";
import * as yup from 'yup';
import AuthContext from "../config/context/auth-context";


export const FormElastic = ({ item, refresh, refreshExtra , hidden}) => {

    const [openModal, setOpenModal] = useState(false);
    const [deleteSpinner, setDeleteSpinner] = useState(false);

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
                if (response.status == 'OK') {

                    if(refresh)await refresh(item?.refreshDate);

                    if (item?.refreshExtra) await refreshExtra(item?.refreshExtra);


                    setOpenModal(false)
                    customAlert(
                        'Registro Correcto',
                        '',
                        'success'
                    );
                }
                else {
                    throw  Error("Error");
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
    const valuesInicia = async (itemFiel) => {
        let valuesItem = {};
        const mapeo = () => {
            itemFiel.data.map((input) => {
                if (input.value) {
                    valuesItem = {
                        ...valuesItem,
                        [input.id]: input.value
                    };
                }

            })
            formik.setValues(valuesItem);
        }
        mapeo();

    }

    const deleteRegister = async (itemDelete) => {
        setDeleteSpinner(true)
        try {

            const response = await AxiosClientJSON({
                url: itemDelete?.url,
                method: 'DELETE',
                data: itemDelete?.values,
            });
            console.log(response)
            if (response.status == 'OK') {

               if(itemDelete?.navigate) navigate(itemDelete?.navigate , { replace:true})
               if(refresh)await refresh(item?.refreshDate);

               if (item?.refreshExtra) await refreshExtra(item?.refreshExtra);
                setOpenModal(false)
            }
            else {
                console.log(error);
                throw  Error("Error");

            }

        } catch (error) {
            customAlert(
                'Registro incorrecto',
                'Revisa los datos',
                'error'
            );
        }
    }
    return (
        <>
            <Button onClick={() => { valuesInicia(item); setOpenModal(true); }} color="dark" size={'xs'} className={`ml-3 ${hidden}`} style={{ backgroundColor: 'var(--red-3)' }}>{item?.button?.name} </Button>
            <Modal show={openModal} size="4xl" popup onClose={() => setOpenModal(false)} className="duration-75" >
                <form className="space-y-4 md:space-y-6 p-2 pt-3" onSubmit={formik.handleSubmit} id="forms" noValidate encType="multipart/form-data">
                    <Modal.Header ><p className="text-2xl font-medium text-gray-900 dark:text-white">{item?.title}</p></Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">

                            <div className="flex flex-wrap w-full items-center justify-center">
                                {item?.data?.map((input) => {
                                    if (input.type === "hidden") {
                                        return (
                                            <div className="hidden" key={input.id} >
                                                <div className="mb-2 block">
                                                    <Label htmlFor={input.id} value={input.text} />
                                                </div>
                                                <TextInput

                                                    value={formik.values[input.id]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}

                                                    id={input.id}
                                                    placeholder={input.placeholder}
                                                    type={input.type}
                                                    required
                                                />
                                            </div>
                                        )
                                    }
                                    else if (input.type === "textArea") {
                                        return (
                                            <div className="w-2/5 m-3" key={input.id}>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={input.id} value={input.text} />
                                                </div>
                                                <Textarea

                                                    value={formik.values[input.id]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}

                                                    id={input.id}
                                                    placeholder={input.placeholder}
                                                    type={input.type}
                                                    required
                                                />
                                            </div>
                                        )
                                    }
                                    else if (input?.id === "image") {
                                        return (
                                            <div className="w-2/5 m-3" key={input?.id}>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={input?.id} value={input?.text} />
                                                </div>
                                                <input
                                                    onChange={(e) => {
                                                        formik.setFieldValue('image', e.target.files[0]);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    id={input?.id}
                                                    placeholder={input?.placeholder}
                                                    type="file"
                                                    required
                                                />
                                            </div>
                                        )
                                    }
                                    else {

                                        return (
                                            <div className="w-2/5 m-3" key={input?.id}>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={input.id} value={input?.text} />
                                                </div>
                                                <TextInput

                                                    value={formik.values[input.id]}
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

                                },)

                                }

                                {item?.select?.map((select) => (
                                    <div className="w-2/5 m-3" key={select.id}>
                                        <div className="mb-2 block">
                                            <Label htmlFor={select.id} value={select.text} />
                                        </div>
                                        <Select id={select.id} required
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} >
                                            <option value="">Seleccionar</option>

                                            {


                                                select?.data?.map(elemento => {
                                                    if (elemento.type != null) {
                                                        return (
                                                            <option key={elemento.id} value={elemento.id} > {elemento.type}</option>)

                                                    }
                                                    if (elemento.name != null) {
                                                        return (
                                                            <option key={elemento.id} value={elemento.id} > {elemento.name}</option>)

                                                    }
                                                })






                                            }
                                        </Select>
                                    </div>
                                ))}


                            </div>
                            <div className="flex justify-between items-end w-full ml-3  ">
                                {item?.delete ? <Button
                                    type="button"
                                    color="dark"
                                    style={{ backgroundColor: "var(--red-3)" }}
                                    onClick={
                                        () => deleteRegister(item?.delete)
                                    }
                                    className="w-full h-fit w-1/5"
                                >{deleteSpinner ? (<Spinner />) :
                                (<>

                                    Eliminar
                                </>)}</Button> :null
                            }
                                <Button
                                    type="submit"
                                    color="dark"
                                    onSubmit={
                                        () => {
                                            let forms = document.getElementById('forms');
                                            const formsData = new FormData(forms);
                                            formik.setValues(formsData);
                                        }
                                    }
                                    className="w-full h-fit w-1/5"
                                    disabled={formik.isSubmitting && formik.isValid}
                                >{formik.isSubmitting ? (<Spinner />) :
                                    (<>

                                        Registrar
                                    </>)} </Button>
                            </div>
                        </div>
                    </Modal.Body>

                </form>

            </Modal>
        </>
    );
}