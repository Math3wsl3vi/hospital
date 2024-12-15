"use server"
import { ID } from "node-appwrite";
import { APPOINTMENTS_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import NewAppointment from "@/app/patients/[userId]/new-appointment/page";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const NewAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            ID.unique(),
            appointment
        )
        return parseStringify(NewAppointment);    
    } catch (error) {
        console.log(error)
    }
}

export const getAppointment = async (appointmnetId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            appointmnetId
        )
        return parseStringify(appointment)
    } catch (error) {
        console.log(error)
    }
}