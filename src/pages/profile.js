import Profile from "../components/profile/profile";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Profiles(theme) {
  const title = "Profile";
  document.title = "Inventory | " + title;
  return (
    <>
      <Profile theme={theme} />
    </>
  );
}
