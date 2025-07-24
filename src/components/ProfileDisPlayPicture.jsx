export default function ProfileDisPlayPicture({ userDetails }) {
  console.log(userDetails);

  return (
    <div className="mt-22 mb-12 gap-4 flex flex-col text-black items-center ">
      <h2 className="font-medium  md:text-2xl tracking-wider">
        Account Profile
      </h2>
      <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem] bg-blue-700">
        OA
      </div>
      <p className="font-[500] text-[1.1rem]   md:text-[1.1rem]">
        {userDetails?.fullName}
      </p>
      <p className="md:pl-6.5 text-[1.2rem]">{userDetails?.email}</p>
    </div>
  );
}
