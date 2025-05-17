// components/MembershipForm.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MembershipLevel } from "@/types/membership";
import { useForm } from "react-hook-form";

interface FormProps {
  defaultValues?: Partial<MembershipLevel>;
  onSubmit: (data: Omit<MembershipLevel, "id">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

const formatThousands = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const unformat = (value: string) => {
  return value.replace(/\./g, "");
};

export function MembershipForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
  isEdit,
}: FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<MembershipLevel, "id">>({
    defaultValues: {
      level: defaultValues?.level || "",
      min_income: defaultValues?.min_income || "",
      max_income: defaultValues?.max_income || "",
      service_fee: defaultValues?.service_fee
    ? parseInt(defaultValues.service_fee).toString()
    : "",
    },
  });

  const watchedMin = watch("min_income");
  const watchedMax = watch("max_income");
  const watchedFee = watch("service_fee");

  const handleFormattedSubmit = (data: Omit<MembershipLevel, "id">) => {
    const cleaned = {
      ...data,
      min_income: unformat(data.min_income),
      max_income: data.max_income ? unformat(data.max_income) : null,
      service_fee: unformat(data.service_fee),
    };
    onSubmit(cleaned);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormattedSubmit)}
      className="grid gap-4 py-4"
    >
      <div className="grid gap-2">
        <label htmlFor="level">Level Name</label>
        <Input
          id="level"
          {...register("level", { required: "Level is required" })}
        />
        {errors.level && (
          <span className="text-red-500">{errors.level.message}</span>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="min_income">Minimum Income</label>
        <Input
          id="min_income"
          inputMode="numeric"
          value={watchedMin ?? ""}
          {...register("min_income", {
            required: "Minimum income is required",
          })}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            const formatted = formatThousands(digitsOnly);
            setValue("min_income", formatted, { shouldValidate: true });
          }}
        />
        {errors.min_income && (
          <span className="text-red-500">{errors.min_income.message}</span>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="max_income">
          Maximum Income (leave empty for unlimited)
        </label>
        <Input
          id="max_income"
          inputMode="numeric"
          value={watchedMax ?? ""}
          {...register("max_income", {
            validate: (val) => {
              if (!val) return true;
              const numeric = val.replace(/\./g, "");
              return /^\d+$/.test(numeric) || "Only digits allowed";
            },
          })}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            const formatted = formatThousands(digitsOnly);
            setValue("max_income", formatted, { shouldValidate: true });
          }}
        />
        {errors.max_income && (
          <span className="text-red-500">
            {errors.max_income.message || "Invalid value"}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="service_fee">Service Fee (%)</label>
        <Input
          id="service_fee"
          inputMode="numeric"
          value={watchedFee ?? ""}
          {...register("service_fee", {
            required: "Service fee is required",
            validate: (val) => {
              const numeric = parseInt(unformat(val), 10);
              if (!Number.isInteger(numeric) || numeric <= 0)
                return "Must be a positive whole number";
              if (numeric > 100) return "Cannot exceed 100";
              return true;
            },
          })}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setValue("service_fee", digitsOnly, { shouldValidate: true });
          }}
        />
        {errors.service_fee && (
          <span className="text-red-500">
            {errors.service_fee.message || "Invalid value"}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isEdit ? "Update" : "Add"} Membership
        </Button>
      </div>
    </form>
  );
}
