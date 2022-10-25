import { NextPage } from "next";
import ProfileInformation from "src/components/profile";
import PageHeader from "src/components/_common/pageHeader";

const ProfilePage: NextPage = () => {
  return (
    <>
      <PageHeader title={"Profile"} />
      <ProfileInformation />
    </>
  );
};

export default ProfilePage;
