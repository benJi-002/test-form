'use client'

import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/validators/form-validator';
import { Select } from '@mantine/core';
import { arrowDownIcon, CheckedIcon } from '../Icons';
import clsx from 'clsx';
import DropZone from './DropZone';
import styles from '../styles/CustomForm.module.css';

const {
  mainContainer,
  switchableDropZone,
  dropZoneDashes,
  dropZoneTitle,
  dropZoneSubtitle,
  title,
  subtitle,
  fieldset,
  input,
  errorMessage,
  errorInput,
  selectWrapper,
  selectRightSection,
  dropdown,
  options,
  option,
  checkWrapper,
  nativeCheck,
  checked,
  checkLabel,
  checkFrame,
  errorCheck,
  submitButton
} = styles;

const CustomForm = () => {

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };

      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };

      case "REMOVE_FILE_FROM_LIST":
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
  
  const [selectValue, setSelectValue] = useState(null);

  const {
    handleSubmit, 
    register,
    reset,
    setValue,
    formState
  } = useForm({ resolver: zodResolver(FormSchema) });

  const {
    errors: {
      name,
      phone,
      email,
      skill,
      files,
      checkbox
    }
  } = formState


  const handleChangeSelect = (value) => {
    setSelectValue(value);
    setValue('skill', value);
  }

  const onSubmit = (formData) => {
    console.log(formData);

    setSelectValue(null);
    dispatch({ type: "CLEAN_FILE_LIST" });
  };


  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };


  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];
    
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      
      files = files.filter((f) => !existingFiles.includes(f.name));
      
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])

  useEffect(() => {
    setValue('files', data.fileList)
  }, [data.fileList])

  return (
    <form 
      onSubmit={(handleSubmit(onSubmit))}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
    >
      <div className={mainContainer}>

        { data.inDropZone === true ? 
          <div 
            className={switchableDropZone}
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            <div className={dropZoneDashes}>
              <h2 className={dropZoneTitle}>Drop files here</h2>
              <h3 className={dropZoneSubtitle}>Put your files in this field</h3>
            </div>
          </div> : null 
        }

        <h1 className={title}>Drop us a line</h1>
        <h2 className={subtitle}>Our documentary campaigns feature leading figures, organisations and leaders, in open and candid discussions.</h2>

        <div className={'flex flex-wrap mt-8'}>
          <fieldset className={fieldset}>
            <input className={name?.message ? errorInput : input} type="text" id='name' placeholder="Name" required {...register('name')}/>
            <p className={clsx(errorMessage, name?.message ? '!block' : null)}>{name?.message}</p>
          </fieldset>

          <div className={'w-full flex gap-4 mt-4'}>
            <fieldset className={fieldset}>
              <input className={phone?.message ? errorInput : input} type="text" id='phone' placeholder="Phone" required {...register('phone')}/>
              <p className={clsx(errorMessage, phone?.message ? '!block' : null)}>{phone?.message}</p>
            </fieldset>

            <fieldset className={fieldset}>
              <input className={email?.message ? errorInput : input} type="text" id='email' placeholder="E-mail" required {...register('email')}/>
              <p className={clsx(errorMessage, email?.message ? '!block' : null)}>{email?.message}</p>
            </fieldset>
          </div>

          <Select
            classNames={{
              root: selectWrapper,
              input: skill?.message ? errorInput : input,
              section: selectRightSection,
              dropdown: dropdown,
              options: options,
              option: option,
            }}
            placeholder="Your skill"
            data={['Junior', 'Middle', 'Senior', 'Lead', 'CTO']}
            value={selectValue}
            rightSectionPointerEvents="none"
            rightSection={arrowDownIcon}
            maxDropdownHeight='auto'
            comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false }, offset: 8 }}
            required
            onChange={handleChangeSelect}
          />
          <p className={clsx(errorMessage, skill?.message ? '!block' : null)}>{skill?.message}</p>
        </div>

        <DropZone 
          data={data} 
          dispatch={dispatch} 
          error={files?.message}
        />

        <fieldset>
          <div className={checkWrapper}>
            <input className={nativeCheck} type="checkbox" id='checkbox' required {...register('checkbox')}></input>
            <div className={checkbox?.message ? errorCheck : checkFrame}>
              <CheckedIcon className={checked}/>
            </div>
            <label className={checkLabel} htmlFor="checkbox">I’m agree with every data you collect</label>
          </div>
          <p className={clsx(errorMessage, checkbox?.message ? '!block' : null)}>{checkbox?.message}</p>
        </fieldset>

        <button className={submitButton} type="submit">Send</button>
      </div>
    </form>
  );
};

export default CustomForm; 