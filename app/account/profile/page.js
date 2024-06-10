import { currentLoggedinUser } from "@/app/_auth/auth";
import SelectCountry from "@/app/_components/SelectCountry";
import UpdateUserProfile from "@/app/_components/UpdateProfile";
import { getGuest } from "@/app/_services/data-service";

export const metadata = {
  title: "profile",
};

export default async function Page() {
  let { currentUser } = await currentLoggedinUser();

  if (!currentUser.nationalid) {
    const guest = await getGuest(currentUser.email);

    currentUser = { ...currentUser, ...guest };
  }

  console.log(currentUser, "lopppppppppppppp");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateUserProfile user={currentUser}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={currentUser.nationality}
        />
      </UpdateUserProfile>
    </div>
  );
}
