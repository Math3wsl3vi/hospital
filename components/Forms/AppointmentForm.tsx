"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { getAppointmentSchema } from "@/lib/Validation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import Image from "next/image"
import { SelectItem } from "../ui/select"
import { newDate } from "react-datepicker/dist/date_utils"
import { createAppointment } from "@/lib/actions/appointment.actions"


const AppointmentForm = ({
    userId,
    patientId, 
    type
}:{
    userId:string;
    patientId: string;
    type:'create' | 'cancel' | 'schedule';
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",

    },
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
        case 'schedule':
            status = 'schedule'
            break;
        case 'cancel':
            status = 'cancelled'
            break;
        default:
            status = 'pending'

            break;
    }
    console.log(type)
    try {
        if(type === 'create' && patientId) {
            const appointmentData = {
                userId,
                patient:patientId,
                primaryPhysician:values.primaryPhysician,
                schedule:new Date(values.schedule),
                reason: values.reason!,
                note:values.note,
                status: status as Status
            }
        const appointment = await createAppointment(appointmentData)

            if(appointment){
                form.reset();
                router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
            console.log('here')

            }
        }
    } catch (error) {
    console.log(error)
    }
    finally{
    setIsLoading(false)
    }
  }

  let btnLabel;
  switch (type) {
    case 'cancel':
        btnLabel = 'Cancel Appointment'
        break;
    case 'create':
            btnLabel = 'Book Appointment'
            break;    
    case 'schedule':
        btnLabel = 'schedule Appointment'
        break;
    default:
        break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Book an Appointment</p>
        </section>
        {/* form field */}
        {/* you can duplicate them to change the properties */}

        {type !== 'cancel' && (
            <>
             <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctors"
            placeholder="Select a Doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField 
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name='schedule'
          label="Expected Appointment Date"
          showTimeSelect
          dateFormat="MM/dd/yyyy - h:mm aa"
          />
          <div className="flex flex-col gap-4 xl:flex-row">
          <CustomFormField 
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name='reason'
          label="Reason for Appointment"
          placeholder="Enter a reason for appointment"
          />
          <CustomFormField 
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name='note'
          label="Notes"
          placeholder="Additional Notes"
          />
          </div>
            </>
        )} 

        {type === 'cancel' && (
            <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label="Reason for cancellation"
            placeholder="Enter the reason for cancellation"
            />
        )}
        
        {/* <Button type="submit">Submit</Button> */}
        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn': 'shad-primary-btn'} w-full`}>{btnLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm