import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
    Nombres: Yup.string()
        .max(50, 'El nombre es muy largo!')
        .required('El nombre es obligatorio'),
    Apellidos: Yup.string()
        .min(2, 'El nombre es muy corto!')
        .max(50, 'El nombre es muy largo!')
        .required('El apellido es obligatorio'),
    hijos: Yup.array().of(Yup.object().shape({
        Nombres: Yup.string().required("Nombre del hij@ obligatorio"),
        Apellidos:Yup.string().required("Apellido del hij@ obligatorio")
    }))
});


export default function Formulario2() {


    return (

        <Formik
            validationSchema={FormSchema}
            initialValues={
                { hijos: [], Nombres: "", Apellidos: "" }
            }
            
            onSubmit={values => {
                console.log("Guardando", values);
                fetch('/WeatherForecast', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(r => r.text()).then(v => {
                    console.log("datos guardados");
                });
            }}

            render={({ values, errors }) => (
                <Form>
                    <p>
                       
                        <Field type="text" name="Nombres" placeholder="Nombres" />
                        <ErrorMessage name="Nombres">{msg => <div class="error">{msg}</div>}</ErrorMessage>
                    </p>
                    <p>
                        <Field type="text" name="Apellidos" placeholder="Apellidos" />
                        <ErrorMessage name="Apellidos">{msg => <div class="error">{msg}</div>}</ErrorMessage>
                    </p>
                    <p>
                        <Field type="date" name="FechaIngreso" />
                    </p>

                    <FieldArray name="hijos" render={arrayHelpers => (
                        <>
                            <div>
                                <label>{values.hijos.length}</label>

                                {values.hijos.map((hijo, i) =>
                                    (<div key={i}>
                                        <Field type="hidden" name={`hijos.${i}`} />
                                        <p>
                                            <Field name={`hijos.${i}.Nombres`} placeholder="Nombres" />
                                            <ErrorMessage name={`hijos.${i}.Nombres`}>{msg => <div class="error">{msg}</div>}</ErrorMessage>
                                        </p>
                                        <p>
                                            <Field name={`hijos.${i}.Apellidos`} placeholder="Apellidos" />
                                            <ErrorMessage name={`hijos.${i}.Apellidos`}>{msg => <div class="error">{msg}</div>}</ErrorMessage>
                                        </p>
                                        <p> <button onClick={() => arrayHelpers.remove(i)}>Eliminar este hijo</button></p>
                                    </div>
                                    ))}
                            </div>
                            <button onClick={() => arrayHelpers.push({})}>Agregar hijo</button>
                            <hr/>
                        </>
                    )}>
                    </FieldArray>


                    <input type="submit" value="Guardar" />
                </Form>

            )}>


        </Formik>
    );
}