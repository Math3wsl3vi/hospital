import RegisterForm from "@/components/Forms/RegisterForm";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const Register = async ({ params }: SearchParamProps) => {
  // Await the params before destructuring
  const resolvedParams = await params;
  const { userId } = resolvedParams;

  const user = await getUser(userId); 
return (
  <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
    <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image 
        src='/assets/icons/logo-full.svg'
        alt="image"
        height={1000}
        width={1000}
        className="mb-12 h-10 w-fit"
        />
        <RegisterForm user={user}/>
        <p className="justify-items-end text-dark-600 xl:text-left copyright py-12">© 2024 Doctor App</p>
      </div>
    </section>

    <Image 
    src='/assets/images/register-img.png'
    alt="picture"
    width={1000}
    height={1000}
    className="side-img max-w-[390px] md:block hidden"
    />
  </div>
);
}

export default Register
