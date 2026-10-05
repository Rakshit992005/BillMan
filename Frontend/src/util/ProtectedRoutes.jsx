import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/auth`, {
          withCredentials: true,
        });

        setLoading(false);
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoutes;