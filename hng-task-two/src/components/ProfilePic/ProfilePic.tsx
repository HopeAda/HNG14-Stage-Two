import "./ProfilePic.css";
import ProfileImg from "/profilepic.png";

const ProfilePic = () => {
	return (
		<div className="profile">
			<div className="container">
				<img src={ProfileImg} alt="" />
			</div>
		</div>
	);
};

export default ProfilePic;
