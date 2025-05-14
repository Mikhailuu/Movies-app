import { createGuestSession } from "../../utils/api";
import { useState } from "react";

const GuestSession = ({ onLogged }) => {
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [error, setError] = useState(null);

  if (sessionStorage.getItem("sessionId")) return null;

  const handleGuestLogin = async () => {
    const guestSessionData = await createGuestSession();
    if (guestSessionData.success) {
      setGuestSessionId(guestSessionData.guest_session_id);
    } else {
      setError(
        <Alert message={"Ошибка создания гостевой сессии"} type={"error"} />
      );
    }
    if (!error) onLogged(true);
  };

  return (
    <div>
      {error ? error : null}
      {guestSessionId ? null : (
        <button onClick={handleGuestLogin}>Log in as a guest</button>
      )}
    </div>
  );
};

export default GuestSession;
