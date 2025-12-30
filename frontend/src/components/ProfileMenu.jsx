import ProfileItem from "./ProfileItem";

function ProfileMenu() {
  return (
    <div style={{ marginTop: "20px" }}>
      <ProfileItem title="🏦 Bank Accounts" link="/bank" />
      <ProfileItem title="🔔 Notifications" link="/notifications" />
      <ProfileItem title="🔐 Security" link="/security" />
      <ProfileItem title="🎧 Support" link="/support" />
      <ProfileItem title="🎁 Offers" link="/offers" />
    </div>
  );
}

export default ProfileMenu;
