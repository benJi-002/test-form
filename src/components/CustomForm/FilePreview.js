import styles from "../styles/FilePreview.module.css";

const FilePreview = ({ fileData, onDelete }) => {

  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        
        {fileData.fileList.map((f) => {
          return (
              <ol key={f.lastModified}>
                <li className={styles.fileList}>
                  <div key={f.name} className={styles.fileName} onClick={(e) => onDelete(e)}>
                    {f.name}
                  </div>
                </li>
              </ol>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;