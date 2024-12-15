"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { FormFieldType } from './Forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'


  interface customProps{
    control:Control<any>,
    fieldType:FormFieldType,
    name: string,
    label? : string,
    placeholder? : string,
    iconSrc?: string,
    iconAlt? : string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect? :boolean,
    children?: React.ReactNode,
    renderSkeleton?:(field: any) => React.ReactNode
  }

  const RenderField = ({field, props}:{field:any, props:customProps}) => {
    const { fieldType, iconSrc,iconAlt,placeholder,renderSkeleton,showTimeSelect,dateFormat } = props;
       switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 '>
                    {props.iconSrc && (
                        <Image
                        src={iconSrc || ''}
                        alt={iconAlt || 'icon'}
                        height={24}
                        width={24}
                        />
                    )}
                    <FormControl>
                        <Input
                        placeholder={placeholder}
                        {...field}
                        className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT: 
            return(
                <FormControl>
                     <PhoneInput
                        defaultCountry="KE"
                        international
                        withCountryCallingCode
                        value={field.value}
                        onChange={field.onChange}
                        className='bg-white px-3 h-11 rounded-md border border-dark-500' 
                        placeholder={placeholder}/>

                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
          return(
            <div className='flex px-3 h-11 items-center rounded-md border border-dark-500  bg-white'>
              <Image
              src='/assets/icons/calendar.svg'
              alt='calender'
              width={24}
              height={24}
              className='ml-2'
              />
              <FormControl>
              <DatePicker 
              selected={field.value} 
              onChange={(date) => field.onChange(date)} 
              showTimeSelect={showTimeSelect ?? false}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              timeInputLabel='Time'
              wrapperClassName='date-picker'
              />
              </FormControl>
            </div>
          )
        case FormFieldType.SELECT:
          return (
            <FormControl>
              <Select onValueChange={field.onChange}
              defaultValue={field.value}>
                <FormControl className='shad-select-trigger'>
                  <SelectTrigger>
                  <SelectValue placeholder={placeholder}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='shad-select-content'>
                  {props.children}
                </SelectContent>
              </Select>
            </FormControl>
          )
        case FormFieldType.TEXTAREA:
          return(
            <FormControl>
              <Textarea
              placeholder={placeholder}
              {...field}
              className='shad-textArea'
              />
            </FormControl>
          )
        case FormFieldType.CHECKBOX:
          return (
            <FormControl>
              <div className='flex items-center gap-4'>
                <Checkbox 
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                />
                <label htmlFor={props.name}
                className='checkbox-label'>
                  {props.label}
                </label>

              </div>
            </FormControl>
          )
        case FormFieldType.SKELETON:
          return renderSkeleton ? renderSkeleton
          (field) : null
        default:
            break;
       }
  }
const CustomFormField = (props:customProps) => {
    const { control,fieldType, name, label } = props;
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel className="shad-input-label">{label}</FormLabel>
                )}
                <RenderField field={field} props={props}/>
                <FormMessage className='shad-error'/>
            </FormItem>
          )}
        />
  )
}

export default CustomFormField