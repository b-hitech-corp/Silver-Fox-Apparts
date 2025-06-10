import Heading from "@/app/_ui/Heading";
import ProfileForm from "./_components/ProfileForm";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";

export const metadata = {
  title: "My Profile",
  description: "View and Edit your profile details",
};

// Dynamically import client component
const ProfileClient = dynamic(() => import("./_components/ProfileClient"), {
  ssr: false,
});

async function Profile() {
  return (
    <>
      <Heading textClassName={styles.heading}>Edit Profile</Heading>
      {/* <ProfileForm guest={""} /> */}
      <ProfileClient />
    </>
  );
}

export default Profile;
