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
import { UserFormValidation } from "@/lib/Validation"
  export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA='textarea',
    PHONE_INPUT= 'phoneInput',
    CHECKBOX= 'checkbox',
    DATE_PICKER= 'datePicker',
    SELECT='select',
    SKELETON='skeleton,'
  } 


  const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
      },
    })
  
    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
      setIsLoading(true);
      try {
        const userData = {name, email, phone}

        const newUser = await createUser(userData);

        if (newUser) {
          router.push(`/patients/${newUser.$id}/register`)
        }
      } catch (error) {
      console.log(error)
        
      }
      finally{
      setIsLoading(false)
      }
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi There</h1>
            <p className="text-dark-700">Schedule Your First appointment</p>
          </section>
          {/* form field */}
          {/* you can duplicate them to change the properties */}
          <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          />
          <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          />

          <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="+254 712 345 678"
          />
          
          
          {/* <Button type="submit">Submit</Button> */}
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    )
  }

  export default PatientForm