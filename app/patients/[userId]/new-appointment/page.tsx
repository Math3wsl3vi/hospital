import AppointmentForm from "@/components/Forms/AppointmentForm";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({ params:{ userId }}:SearchParamProps) {

  const patient = await getPatient(userId);
return (
  <div className="flex h-screen max-h-screen">
    {/* add otp verification modal */}
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image 
        src='/assets/icons/logo-full.svg'
        alt="image"
        height={1000}
        width={1000}
        className="mb-12 h-10 w-fit"
        />
        <AppointmentForm
        type="create"
        userId={userId}
        patientId={patient.$id}
        />
          <p className="justify-items-end text-dark-600 xl:text-left copyright mt-10 py-12">© 2024 Doctor App</p>
      </div>
    </section>

    <Image 
    src='/assets/images/appointment-img.png'
    alt="picture"
    width={1000}
    height={1000}
    className="side-img max-w-[390px]"
    />
  </div>
);
}
