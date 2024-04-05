'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/validators/form-validator';
import { useEffect, useReducer } from 'react';
import DropZone from './DropZone';

const CustomForm = () => {

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };

      case "ADD_FILE_TO_LIST":
        // console.log("ADD", state.fileList)
        return { ...state, fileList: state.fileList.concat(action.files) };

      case "REMOVE_FILE_FROM_LIST":
        // console.log("REMOVE", state.fileList)
        return { ...state, fileList: state.fileList = action.files };

      case "CLEAN_FILE_LIST":
          return { ...state, fileList: state.fileList = [] };

      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });


  const {
    handleSubmit, 
    register,
    reset,
    setValue,
    formState
  } = useForm({ resolver: zodResolver(FormSchema) });

  const onSubmit = (formData) => {

    formData = {...formData, files: data.fileList}
    console.log(formData);

    dispatch({ type: "CLEAN_FILE_LIST" });
  };

  const onError = (errors) => console.log(errors)

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])

  return (
    <form onSubmit={(handleSubmit(onSubmit, onError))}>
      <div className={'p-10 max-w-160 bg-white rounded-[32px]'}>
        <h1>Drop us a line</h1>
        <h2>Our documentary campaigns feature leading figures, organisations and leaders, in open and candid discussions.</h2>

        <fieldset>
          <input type="text" id='name' placeholder="Name" required pattern='([a-zA-Z]|\s|^)+' {...register('name')}/>
          <p className={'text-red-500'}>{formState.errors.name?.message}</p>
        </fieldset>

        <fieldset>
          <input type="text" id='phone' placeholder="Phone" required {...register('phone')}/>
          <p className={'text-red-500'}>{formState.errors.phone?.message}</p>
        </fieldset>

        <fieldset>
          <input type="text" id='email' placeholder="Email" required {...register('email')}/>
          {<p className={'text-red-500'}>{formState.errors.email?.message}</p>}
        </fieldset>



        <DropZone data={data} dispatch={dispatch} setValue={setValue}/>

        <fieldset>
          <input type="checkbox" id='checkbox' required {...register('checkbox')}></input>
          <label htmlFor="checkbox">I’m agree with every data you collect</label>
          {<p className={'text-red-500'}>{formState.errors.checkbox?.message}</p>}
        </fieldset>

        <fieldset>
          <button type="submit">Send</button>
        </fieldset>
      </div>
    </form>
  );
};

export default CustomForm; 