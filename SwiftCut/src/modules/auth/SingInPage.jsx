import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SiAwsfargate } from "react-icons/si";
import { useFormik } from "formik";
import AuthContext from '../../config/context/auth-context';
import * as yup from 'yup';
import AxiosClient from "../../config/http-client/axios-client";
import { customAlert } from "../../config/alert/alert";
import { Button, Label, Spinner, FloatingLabel } from 'flowbite-react';
import barbaco from '../../assets/svg/barbecue_3x93.svg'
import logo from '../../assets/img/logo-blackLike.png'
import { } from '../../assets/css/SingInPage.css'

export const SingInPage = () => {
    const dispah = useContext(AuthContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            username: yup.string().required('Campo obligatorio'),
            password: yup.string().required('Campo obligatorio'),

        }),
        onSubmit: async (values, { setSubmiting }) => {
            try {
                const response = await AxiosClient({
                    url: '/auth/singin',
                    method: 'POST',
                    data: values
                });
                console.log(response);
                if (!response.console.error) {
                    dispah({ type: 'SIGNNG', payload: response.data })
                    navigate('/', { replace: true });
                } else throw Error("Error");
            } catch (error) {
                customAlert(
                    'Iniciar Sesion',
                    'Usuario y/o contraseña incorrecta',
                    'info'
                );
            } finally {
                setSubmiting(false);
            }
        }
    });

    return (
        <>
            <div className=' w-screen h-screen overflow-hidden flex flex-col justify-center'>
                <div className="flex justify-around">

                    <div className="flex z-50 bg-white rounded-md	">
                        <section className="">


                            <div className="flex flex-col  w-[25rem] justify-center ">
                                <div className="p-6 space-y-4 md:scape-y-6 sm:space-y-8 justify-center items-center flex flex-col" >
                                    <img src={logo} alt="" style={{ width: 300, height: 50 }} />
                                    <Label className="block md-2 text-sm font-medium  text text-gray-400">Sabores que Cortan a la Perfección</Label>
                                </div>
                                <form className="space-y-4 md:space-y-6 p-9  " onSubmit={formik.handleSubmit} noValidate>
                                    <div class="mx-auto w-screen-sm">
                                        <div class="grid grid-flow-col justify-stretch space-x-4">
                                            <FloatingLabel variant="outlined" label="Usuario" type="text" className=""
                                                name="username"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                helperText={formik.errors.username && formik.touched.username ?
                                                    (<span className="text-red-600">
                                                        {formik.errors.username}
                                                    </span>) : null}
                                                id="username"
                                            />
                                            {/*<Label  className="flex items-center rounded-l-lg border border-slate-400 px-1 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300  peer-focus:bg-red-400 peer-focus:text-white" for="domain"> <FaRegUser /> </Label> */}
                                        </div>


                                        <div className="mt-2">

                                            <FloatingLabel variant="outlined" label="Contraseña" type="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                helperText={formik.errors.password && formik.touched.password ?
                                                    (<span className="text-red-600">
                                                        {formik.errors.password}
                                                    </span>) : null}
                                                id="passoword"
                                                placeholder="********"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/*<div className="flex justify-end">
                                        <a href="#text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>*/ }

                                    <Button
                                        type="submit"
                                        color="dark"
                                        style={{ backgroundColor: "var(--red-3)" }}

                                        className="w-full"
                                        disabled={formik.isSubmitting && formik.isValid}
                                    >{formik.isSubmitting ? (<Spinner />) :
                                        (<>

                                            Iniciar Sesion
                                        </>)} </Button>
                                </form>
                            </div>
                        </section>
                    </div>



                    <div className="relative flex items-center  ">
                        <div className="absolute  -left-48  z-40">
                            <img src={barbaco}></img>
                        </div>
                        <div className="absolute -left-10 z-30 circleSw-1 " style={{ backgroundColor: "#F43759" }}></div>
                        <div className="absolute -left-48  z-20 circleSw-2" style={{ backgroundColor: "#F87E94" }}></div>
                        <div className="absolute -left-72  z-10 circleSw-3" style={{ backgroundColor: "#FCCDD6" }}></div>
                    </div>
                </div>



            </div>

        </>
    )

}