// import BackgroundVideo from "../../assets/users_background.mp4";

const Users = () => {
  return (
    <div className="relative min-w-full min-h-screen">
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={BackgroundVideo}
        autoPlay
        loop
        muted
      /> */}
      <div className="relative z-10 flex items-center justify-center">
        <h1 className="text-blue-500">Welcome to the Users page!</h1>
      </div>
    </div>
  );
};

export default Users;
