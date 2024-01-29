import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRootFolder } from "../../actions/apiActions";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getRootFolder()
      .then((res) => {
        navigate(`/folders/${res.data}`)
        console.log(res);
      })
      .catch((err) => {
        // todo toast sth wrong
      });
  }, []);

  return <div></div>;
};

export default Home;
