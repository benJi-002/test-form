import { useReducer, useEffect, useState } from 'react';
import FilePreview from "./FilePreview";
import styles from "../styles/DropZone.module.css";

const DropZone = ({ data, dispatch, setValue, register}) => {

  const [drop, setDrop] = useState();

  useEffect(() => {
    if (drop) {
      console.log(...drop)
      // console.log(drop)
    }
  }, [drop])

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log("enter")
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };


  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log('leave')
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log('Over')
    e.dataTransfer.dropEffect = "copy";
    // console.log(e.dataTransfer)
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setValue('files', e.dataTransfer.files)
    setDrop(e.dataTransfer.files);

    let files = [...e.dataTransfer.files];
    
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);

      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatch({ type: "ADD_FILE_TO_LIST", files });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };


  const handleFileSelect = (e) => {

    setValue('files', e.target.files)

    setDrop(e.target.files);

    let files = [...e.target.files];
    
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      
      files = files.filter((f) => !existingFiles.includes(f.name));
      
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };


  const handleFileDelete = (e) => {

    let file = e.target.innerHTML;

    if (file && file.length > 0) {
      const files = data.fileList.filter((f) => f.name !== file);

      dispatch({ type: "REMOVE_FILE_FROM_LIST", files });
    }
  }


/*   const uploadFiles = async () => {

    let files = data.fileList;
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/fileupload", {
      method: "POST",
      body: formData,
    });


    if (response.ok) {
      alert("Files uploaded successfully");
    } else {

      alert("Error uploading files");
    }
  }; */

  return (
    <>
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        {/* <Image src="/upload.svg" alt="upload" height={50} width={50} /> */}

        <input
          id="files"
          type="file"
          multiple
          accept=".pdf,.docx,.png"
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="files">You can select multiple Files</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your files here
        </h3>
      </div>

      <FilePreview fileData={data} onDelete={handleFileDelete}/>

    </>
  );
};

export default DropZone;