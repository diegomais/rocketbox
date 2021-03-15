import { distanceInWords } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { MdInsertDriveFile } from "react-icons/md";
import io from "socket.io-client";
import api from "../../services/api";
import styles from "../../styles/Box.module.css";

export default function Box() {
  const router = useRouter();
  const [box, setBox] = useState({});
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      api.get(`boxes/${id}`).then(({ data }) => {
        setBox(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const socket = io(
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"
      );

      socket.emit("connectRoom", id);

      socket.on("file", (data) => {
        setBox((prevState) => ({
          ...prevState,
          files: [data, ...prevState.files],
        }));
      });
    }
  }, [id]);

  const handleUpload = useCallback(
    (files) => {
      files.forEach((file) => {
        const data = new FormData();
        data.append("file", file);
        api.post(`boxes/${id}/files`, data);
      });
    },
    [id]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>RocketBox - {box.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <img src="/logo.svg" alt="RocketBox Logo" />
        <h1>{box.title}</h1>
      </header>
      <Dropzone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div className={styles.upload} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop files or click here to upload.</p>
          </div>
        )}
      </Dropzone>
      <ul>
        {box.files &&
          box.files.map((file) => (
            <li key={file._id}>
              <a
                className={styles.fileInfo}
                href={file.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MdInsertDriveFile size={24} color="#a5cfff" />
                <strong>{file.title}</strong>
              </a>
              <span>
                Updated {distanceInWords(file.createdAt, new Date())} ago
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}