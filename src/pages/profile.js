import Profile from "../components/profile/profile";

export default function Profiles(theme) {
  const title = "Profile";
  document.title = "Inventory | " + title;
  return (
    <>
      <Profile theme={theme} />
    </>
  );
}
