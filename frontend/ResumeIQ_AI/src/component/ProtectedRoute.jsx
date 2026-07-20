import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {supabase} from "../services/supabase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;