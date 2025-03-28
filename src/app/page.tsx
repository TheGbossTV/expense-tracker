import Image from "next/image";
import HomeImage from "../../assets/HomeImage.png";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  return (
    <div className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-12">
      <Image
        src={HomeImage}
        alt="Expenses Tracker Preview"
        width={700}
        height={472}
        className="rounded-md"
      />

      <div>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Track your <b>expenses</b> with ease
        </h1>

        <p className="text-2xl font-medium max-w-[600px]">
          Use Expenses Tracker to easily keep track of your expenses. Get
          lifetime access for 99€.
        </p>

        <div className="mt-10 space-x-3 flex justify-center pr-34">
          <LoginLink className="bg-black text-white py-2 px-4 rounded-lg font-medium">
            Login
          </LoginLink>
          <RegisterLink className="bg-black/50 text-white py-2 px-4 rounded-lg font-medium">
            Register
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}
