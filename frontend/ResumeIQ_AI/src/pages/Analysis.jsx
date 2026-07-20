import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {DashboardNavbar} from "../component/DashboardNavbar";
import { supabase } from "../services/supabase";
import "../styles/Analysis.css";

export  function Analysis() {

    const location = useLocation();
    const navigate = useNavigate();

    const file = location.state?.file;

    const [analysis, setAnalysis] = useState("");
    const [score, setScore] = useState(0);
    const [displayScore, setDisplayScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!file) {
            navigate("/uploadresume");
            return;
        }

        analyzeResume();

    }, []);

    const analyzeResume = async () => {

        try {

            const formData = new FormData();
            formData.append("resume", file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`,{

                method: "POST",
                body: formData

            });

            const data = await response.json();

            if (data.success) {

                setAnalysis(data.analysis);

                const match = data.analysis.match(/Resume Score:\s*(\d+)/i);

                if (match) {

    const finalScore = parseInt(match[1]);

    setScore(finalScore);

    // Get logged in user
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

                email: user.email,

                score: finalScore

            })

        });

    }

}
            }

        }
        catch (err) {

            console.log(err);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (score === 0) return;

        let current = 0;

        const timer = setInterval(() => {

            current++;

            setDisplayScore(current);

            if (current >= score) {

                clearInterval(timer);

            }

        }, 25);

        return () => clearInterval(timer);

    }, [score]);

    return (

        <>
            <DashboardNavbar />

            <div className="analysis-page">

                <div className="analysis-card">

                    <h1>Resume Analysis</h1>

                    <div className="score-circle">

                        <span>

                            {loading ? "..." : displayScore}

                        </span>

                    </div>

                    {loading && (

                        <p className="loading-text">

                            🤖 ResumeIQ AI is analyzing your resume...

                        </p>

                    )}

                    {!loading && (

                        <div className="analysis-result">

                            <pre>{analysis}</pre>

                        </div>

                    )}

                    <button

                        className="again-btn"

                        onClick={() => navigate("/uploadresume")}

                    >

                        Analyze Another Resume

                    </button>

                </div>

            </div>

        </>

    );

}
 export default Analysis;