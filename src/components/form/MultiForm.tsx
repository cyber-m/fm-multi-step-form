"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";
import FormSidebar from "./FormSidebar";
import FormInput from "./FormInput";
import FormStep from "./FormStep";
import FormHeader from "./FormHeader";
// import { useWindowWidth } from "@react-hook/window-size";
import { formSchema } from "@/lib/schemas/formSchema";

const plans = [
  { name: "arcade", priceMonth: 9, priceYear: 90, saving: "2 months free" },
  { name: "advanced", priceMonth: 12, priceYear: 120, saving: "2 months free" },
  { name: "pro", priceMonth: 15, priceYear: 150, saving: "2 months free" },
] as const;

const addOns = [
  {
    id: "onlineService",
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonth: 1,
    priceYear: 10,
  },
  {
    id: "LargerStorage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonth: 2,
    priceYear: 20,
  },
  {
    id: "CustomizableProfile",
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    priceMonth: 2,
    priceYear: 20,
  },
] as const;

export function MultiForm() {
  // const screenWidth = useWindowWidth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: { id: "arcade", name: "arcade", price: 9 },
      planPeriod: "monthly",
      addOns: [],
    },
  });

  const { toast } = useToast();
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      className: "bg-white rounded-xl w-fit right-8 bottom-8 absolute",
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-fit rounded-md bg-primary p-4 ">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
    setActiveStep((prev) => prev + 1);
  }

  const steps = [
    { id: 1, fields: ["name", "email", "phone"] as const },
    { id: 2, fields: ["plan"] as const },
    { id: 3, fields: ["addOns"] as const },
    { id: 4, fields: ["name", "email", "phone", "plan", "addOns"] as const },
  ];

  const [activeStep, setActiveStep] = useState(1);

  async function handleNextStep(): Promise<void> {
    const currentStepFields = steps[activeStep - 1].fields;
    const validateFields = await form.trigger(currentStepFields);
    console.log(validateFields);
    console.log(form.formState);
    if (validateFields && activeStep <= steps.length) {
      setActiveStep((prev) => prev + 1);
    }
  }

  function handlePrevStep(): void {
    setActiveStep((prev) => prev - 1);
  }

  type planType = {
    name: string;
    priceMonth: number;
    priceYear: number;
    saving: string;
  };
  async function handlePlan(plan: planType) {
    const price = form.getValues("planPeriod") === "monthly" ? plan.priceMonth : plan.priceYear;
    form.setValue("plan", { id: plan.name, name: plan.name, price: price });
    await form.trigger("plan");
    console.log(form.getValues());
  }

  const handleAddOnClick = () => {
    console.log(form.getValues());
  };

  const planPeriod = form.watch("planPeriod");

  const getPeriodShortHand = (
    period: z.infer<typeof formSchema>["planPeriod"] = form.getValues("planPeriod"),
  ): string => {
    if (period === "monthly") {
      return "mo";
    }
    return "yr";
  };

  return (
    <>
      <FormSidebar
        imageWidth={375}
        imageHeight={172}
        active={activeStep}
        image="/assets/images/bg-sidebar-mobile.svg"
        className="hidden sm:flex"
      />
      <div className="relative z-10 flex h-[600px] w-[940px] max-w-full overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:py-0 sm:h-auto sm:flex-col sm:px-0">
        <FormSidebar
          imageWidth={274}
          imageHeight={568}
          active={activeStep}
          image="/assets/images/bg-sidebar-desktop.svg"
          className="sm:hidden"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col items-center justify-between pl-[40px] pr-[24px] sm:z-50 sm:px-6 sm:py-8"
            aria-describedby="step-description"
          >
            {activeStep === 1 && (
              <FormStep>
                <FormHeader
                  title="Personal info"
                  description="Please provide your name, email address, and phone number."
                />
                <div className="flex flex-col gap-6">
                  <FormInput
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="e.g. Stephen King"
                    type="text"
                  />
                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email Address"
                    placeholder="e.g. stephenking@lorem.com"
                    type="email"
                  />
                  <FormInput
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="e.g. +1 234 567 890"
                    type="tel"
                  />
                </div>
              </FormStep>
            )}

            {activeStep === 2 && (
              <FormStep>
                <FormHeader title="Select your plan" description="You have the option of monthly or yearly billing." />
                <div className="flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 md:w-full">
                        <FormControl>
                          <ToggleGroup
                            className="justify-between gap-3 sm:flex-col sm:items-stretch sm:justify-between md:w-full"
                            size="auto"
                            type="single"
                            {...field}
                            value={field.value.name}
                          >
                            {plans.map((e) => {
                              return (
                                <ToggleGroupItem
                                  onClick={() => handlePlan(e)}
                                  value={e.name}
                                  key={e.name}
                                  name={e.name}
                                  aria-label={`Toggle ${e.name}`}
                                  className="md:w-full"
                                >
                                  <div className="flex  w-[8.625rem] md:w-full max-w-full flex-col items-start justify-between gap-10 rounded-lg px-3 py-5 sm:py-4  sm:w-full sm:flex-row  sm:justify-normal">
                                    <Image
                                      width={40}
                                      height={40}
                                      src={`/assets/images/icon-${e.name}.svg`}
                                      alt={e.name}
                                    />
                                    <div className="flex flex-col items-start">
                                      <h2 className="text-base font-medium capitalize text-primary">{e.name}</h2>
                                      {
                                        <p className="text-sm text-coolGray">
                                          {planPeriod === "monthly"
                                            ? `$${e.priceMonth}/${getPeriodShortHand()}`
                                            : `$${e.priceYear}/${getPeriodShortHand()}`}
                                        </p>
                                      }
                                      {planPeriod === "yearly" && (
                                        <p className="text-xs text-primary font-normal">{e.saving}</p>
                                      )}
                                    </div>
                                  </div>
                                </ToggleGroupItem>
                              );
                            })}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="planPeriod"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-center gap-6 rounded-lg bg-alabaster p-4">
                        <span className={`${field.value === "monthly" ? "text-primary" : "text-coolGray"} font-medium`}>
                          Monthly
                        </span>
                        <FormControl>
                          <Switch
                            checked={field.value === "yearly"}
                            onCheckedChange={(checked) => {
                              const newValue = checked ? "yearly" : "monthly";
                              form.setValue(field.name, newValue);
                              const newAddons = form.getValues("addOns")?.map((e) => {
                                const addon = addOns.filter((addon) => e.id === addon.id)[0];
                                const price = checked ? addon.priceYear : addon.priceMonth;
                                return { id: e.id, name: e.name, price: price };
                              });

                              console.log(newAddons);
                              form.setValue("addOns", newAddons);
                              const currentPlanId = form.getValues("plan").id;
                              const currentPlane = plans.filter((plan) => plan.name == currentPlanId)[0];
                              handlePlan(currentPlane);
                            }}
                          />
                        </FormControl>
                        <span className={`${field.value === "yearly" ? "text-primary" : "text-coolGray"} font-medium`}>
                          Yearly
                        </span>
                      </FormItem>
                    )}
                  />
                </div>
              </FormStep>
            )}

            {activeStep === 3 && (
              <FormStep>
                <FormHeader title="Pick add-ons" description="Add-ons help enhance your gaming experience." />
                <div className="flex flex-col gap-4 sm:gap-3">
                  {addOns.map((e) => (
                    <FormField
                      key={e.id}
                      control={form.control}
                      name="addOns"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            role="button"
                            onClick={() => handleAddOnClick()}
                            className={cn(
                              "flex cursor-pointer flex-row items-center gap-6 rounded-lg border p-6 hover:border-purplishBlue sm:gap-4 sm:p-4",
                              field.value?.some((addIn) => addIn.id === e.id) &&
                                "border border-purplishBlue bg-alabaster",
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.some((addIn) => addIn.id === e.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        {
                                          id: e.id,
                                          name: e.name,
                                          price:
                                            form.getValues("planPeriod") === "monthly" ? e.priceMonth : e.priceYear,
                                        },
                                      ])
                                    : field.onChange(field.value?.filter((value) => value.id !== e.id));
                                }}
                              />
                            </FormControl>
                            <div className=" leading-none">
                              <FormLabel className="text-base ">{e.name}</FormLabel>
                              <FormDescription className="text-sm text-coolGray">{e.description}</FormDescription>
                            </div>
                            <div className="flex-grow text-end text-purplishBlue sm:text-xs">
                              {planPeriod === "monthly"
                                ? `+$${e.priceMonth}/${getPeriodShortHand()}`
                                : `+$${e.priceYear}/${getPeriodShortHand()}`}
                            </div>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormStep>
            )}

            {activeStep === 4 && (
              <FormStep>
                <FormHeader title="Finishing up" description="Double-check everything looks OK before confirming." />
                <div className="flex flex-col gap-6">
                  <div className="rounded-lg bg-alabaster px-6 py-5">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-base font-medium capitalize text-primary">{`${
                          form.getValues("plan").name
                        } (${form.getValues("planPeriod")})`}</p>
                        <Button
                          variant={"link"}
                          onClick={() => {
                            setActiveStep(2);
                          }}
                          type="button"
                          size={"link"}
                        >
                          Change
                        </Button>
                      </div>
                      <p className="text-base font-medium text-primary">{`$${
                        form.getValues("plan").price
                      }/${getPeriodShortHand()}`}</p>
                    </div>
                    <Separator className="my-4 bg-lightGray" />

                    <div className="flex flex-col gap-5">
                      {addOns.map(
                        (e) =>
                          form.getValues("addOns")?.some((addIn) => addIn.id === e.id) && (
                            <div key={e.id} className="flex justify-between text-sm">
                              <p className="text-coolGray">{e.name}</p>
                              <p className="text-primary ">
                                {form.getValues("planPeriod") === "monthly"
                                  ? `+$${e.priceMonth}/${getPeriodShortHand()}`
                                  : `+$${e.priceYear}/${getPeriodShortHand()}`}
                              </p>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between px-6">
                    <p className="text-sm text-coolGray">{`Total (per ${
                      form.getValues("planPeriod") === "monthly" ? "month" : "year"
                    })`}</p>
                    <p className="text-xl font-bold text-purplishBlue">
                      $
                      {`${
                        form.getValues("addOns")?.reduce((accumulator, addOn) => accumulator + addOn.price, 0) ||
                        0 + form.getValues("plan")?.price
                      }/${getPeriodShortHand()}`}
                    </p>
                  </div>
                </div>
              </FormStep>
            )}

            {activeStep === 5 && (
              <FormStep className="grid h-full w-full place-items-center pt-0 px-[60px] sm:px-[0] sm:my-20">
                <div className="grid place-items-center">
                  <Image width={80} height={80} src="/assets/images/icon-thank-you.svg" alt="" />
                  <h1 className="mt-8 text-[2rem] font-bold text-primary">Thank You!</h1>
                  <p className="mt-4 text-center text-coolGray">
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need
                    support, please feel free to email us at support@loremgaming.com.
                  </p>
                </div>
              </FormStep>
            )}

            {activeStep < 5 && (
              <div
                className={cn(
                  "bottom-0 flex bg-white pb-4 sm:fixed sm:left-0 sm:w-full sm:p-4",
                  "min-w-[450px] md:min-w-[60vw] md:w-full sm:min-w-[unset] sm:max-w-[unset] ",
                  activeStep > 1 ? "justify-between" : "justify-end",
                )}
              >
                {activeStep > 1 && activeStep <= steps.length && (
                  <Button
                    className="p-0 hover:bg-transparent"
                    size={"lg"}
                    variant={"ghost"}
                    onClick={handlePrevStep}
                    type="button"
                  >
                    Go Back
                  </Button>
                )}

                {activeStep < steps.length && (
                  <Button size={"lg"} onClick={form.handleSubmit(handleNextStep)} type="button">
                    Next Step
                  </Button>
                )}

                {activeStep === steps.length && (
                  <Button size={"lg"} type="submit" className="bg-purplishBlue">
                    Confirm
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
