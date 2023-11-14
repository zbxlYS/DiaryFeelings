"use client";

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'

const page = () => {
    const imgRef = useRef<HTMLInputElement>(null);
    const [imgUrl, setImgUrl] = useState<string>("");

    const send = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (
          imgRef.current &&
          imgRef.current.files &&
          imgRef.current.files.length > 0
        ) {
          const formData = new FormData();
          formData.append("file", imgRef.current.files[0]);
          formData.append("title", "title");
          const result = await axios.post(
            "/api/diary",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(result);
          //보내고 나면 리셋
          imgReset();
        }
      };
    const imgReset = () => {
        if (imgRef.current) {
          imgRef.current.value = "";
          URL.revokeObjectURL(imgUrl);
          setImgUrl((_pre) => "");
        }
      };
      return (
        <div>
          <form>
            <label>file</label>
            <input
              type="file"
              name="cardImg"
              ref={imgRef}
              id="card-img--input"
              onChange={(e: React.ChangeEvent<{ files: FileList | null }>) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  URL.revokeObjectURL(imgUrl);
                  setImgUrl((_pre) => URL.createObjectURL(file));
                }
              }}
            ></input>
            <button
              type="button"
              onClick={imgReset}
            >
              삭제하기
            </button>
          </form>
          {imgUrl && (
            <>
              <div>
                <Image
                  src={imgUrl}
                  alt="preview"
                  width={200}
                  height={300}
                />
              </div>
              <button onClick={(e) => send(e)}>
                submit
              </button>
            </>
          )}
        </div>
      );
}

export default page
