import { useRef, useState } from "react";
import {DashboardNavbar} from "../component/DashboardNavbar";
import "../styles/UploadResume.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import{supabase} from "../services/supabase";
import { useNavigate } from "react-router-dom";
export function UploadResume() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [analysis, setAnalysis] = useState("");

    const navigate = useNavigate();

    const handleFile = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

   const allowedTypes = [
    "image/jpeg",
    "image/png"
];
    if (!allowedTypes.includes(selectedFile.type)) {
        alert("Only PDF, DOC, DOCX, JPG and PNG files are allowed.");
        return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
        alert("File size must be less than 10 MB.");
        return;
    }

    setFile(selectedFile);
    // analyzeResume(selectedFile);
};

const analyzeResume = async (selectedFile) => {

    const formData = new FormData();

    formData.append("resume", selectedFile);

    try{

        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`,{

            method:"POST",

            body:formData

        });

        const data = await response.json();
         

        if (data.success) {

    setAnalysis(data.analysis);

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (user) {

        await fetch(`${import.meta.env.VITE_API_URL}/saveResume`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username: user.user_metadata.username,

                email: user.email

            })

        });

    }

}
        
        else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

        alert("Something went wrong.");

    }finally{

        setLoading(false);

    }

}

    return (
        <>
            <DashboardNavbar />

            <div className="upload-page">

                <div className="upload-card">

                    <h1>Upload Resume</h1>
<br/>
                    <p>
                        Upload your resume and let our AI analyze it.
                    </p>

                    <div
                        className="upload-box"
                        onClick={() => inputRef.current.click()}
                    >

                        <FaCloudUploadAlt className="upload-icon" />

                        <h2>Drag & Drop your Resume</h2>

                        <span>OR</span>
                         
                        <button
        type="button"
        className="upload-btn"
    >
        Click to Choose File
    </button>

    <input
        ref={inputRef}
        type="file"
        hidden
       accept=".png,.jpg,.jpeg"
        onChange={handleFile}
    />

</div>


                    <div className="supported">

                        <h3>Supported Formats</h3>

                        <p>PNG • JPG • JPEG</p>

                        <p>Maximum File Size : 10 MB</p>

                    </div>
<div className="selected-file">

    <strong>Selected File</strong>

    {file ? (
        <>
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </>
    ) : (
        <p>No file selected</p>
    )}

</div>

{loading && (

    <div className="analysis-box">

        <h2>🤖 Analyzing your resume...</h2>

        <p>Please wait while ResumeIQ AI reviews your resume.</p>

    </div>

)}

{analysis && (

    <div className="analysis-box">

        <h2>AI Analysis</h2>

        <pre>{analysis}</pre>

    </div>

)}


<div>

                        <button
    className="upload-btn"
    disabled={!file}
    onClick={() =>
        navigate("/analysis", {
            state: {
                file
            }
        })
    }
>
    Analyze with AI
</button>

                    </div>
</div>


</div>


                   
        </>
    );
}

export default UploadResume;