import { useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import uploadProfilePicture from "../services/apiUpdateProfile";
import { useUser } from "../hooks/useUser";
import useProfilePictures from "../hooks/useProfilePictures";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileInfo = styled.div`
  text-align: center;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ImageUploadForm = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { user } = useUser();

  const userId = user?.id;

  const { mutate, isPending } = useProfilePictures(selectedFile, userId);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      console.log(selectedFile);
      mutate({ image: selectedFile });

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setSelectedFile(null);
      setPreview(null);
      alert("Please select a valid image file");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <UploadContainer className="">
        <FileInput
          type="file"
          accept="image/*"
          id="image"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <UploadButton onClick={handleButtonClick} className="">
          Choose Image
        </UploadButton>
        {selectedFile && (
          <FileInfo>
            <p>Selected file: {selectedFile.name}</p>
            {preview && <ImagePreview src={preview} alt="Preview" />}
          </FileInfo>
        )}
      </UploadContainer>
      {/* <Button onClick={handleSubmit} type="secondary">
        Upload
      </Button> */}
    </div>
  );
};

export default ImageUploadForm;
