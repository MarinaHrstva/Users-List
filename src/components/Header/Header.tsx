import { useNavigate } from "react-router-dom";

import ButtonPrimary from "../UI/ButtonPrimary";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="btn-container header-btn-container">
        <ButtonPrimary className="btn-primary" onClick={() => navigate("/")}>
          Home / User list
        </ButtonPrimary>
        <ButtonPrimary
          className="btn-primary"
          onClick={() => navigate("/tasks")}
        >
          Tasks
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default Header;
