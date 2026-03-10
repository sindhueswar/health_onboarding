import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OnboardingSession } from "../../types/onboarding";
import FormWrapper, { FormField } from "./FormWrapper";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number().min(18, "You must be at least 18 years old"),
  country: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof schema>;

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "IN", label: "India" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "Other", label: "Other" },
];

interface Props {
  session: OnboardingSession;
  onUpdate: (update: Partial<OnboardingSession>) => Promise<void>;
}

const inputClass = "gold-input w-full rounded-xl px-4 py-3 text-sm";

const BasicInfo: React.FC<Props> = ({ session, onUpdate }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: session.data?.basicInfo || {},
  });

  const onSubmit = async (formData: FormData) => {
    await onUpdate({ currentStep: 2, data: { ...session.data, basicInfo: formData } });
  };

  return (
    <FormWrapper
      title="Tell us about yourself"
      subtitle="We need a few details to personalize your experience."
      onContinue={handleSubmit(onSubmit)}
      continueDisabled={isSubmitting}
      continueLabel={isSubmitting ? "Saving..." : "Continue"}
    >
      <FormField label="Full Name" error={errors.fullName?.message}>
        <input {...register("fullName")} className={inputClass} placeholder="John Doe" />
      </FormField>

      <FormField label="Email Address" error={errors.email?.message}>
        <input {...register("email")} className={inputClass} placeholder="john@example.com" />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Age" error={errors.age?.message}>
          <input {...register("age")} type="number" className={inputClass} placeholder="18" />
        </FormField>

        <FormField label="Country" error={errors.country?.message}>
          <select {...register("country")} className={inputClass}>
            <option value="">Select...</option>
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </FormField>
      </div>
    </FormWrapper>
  );
};

export default BasicInfo;
