import SelectCountry from "@/app/_components/SelectCountry";
import UpdateUserProfile from "@/app/_components/UpdateProfile";
import { getGuest } from "@/app/_services/data-service";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "profile",
};

export default async function Page() {
  const session = await auth();
  console.log(session);
  const user = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateUserProfile user={user}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={user.nationality}
        />
      </UpdateUserProfile>
    </div>
  );
}
