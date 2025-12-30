import { useNavigate } from "react-router-dom";

function ProfileItem({ title, link }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        background: "#fafafa"
      }}
    >
      {title}
    </div>
  );
}

export default ProfileItem;
