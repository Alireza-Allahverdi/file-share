import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRootFolder } from "../../actions/apiActions";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getRootFolder()
      .then((res) => {
        navigate(`/folders/${res.data}`);
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  return <div></div>;
};

export default Home;
