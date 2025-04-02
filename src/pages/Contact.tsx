import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import PageContainer from "@/components/PageContainer";
import InputField from "@/components/contact/InputField";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CanvasWrapper from "@/components/contact/CanvasWrapper";

import { formField } from "@/contents/ContactContent";

import { Iform } from "@/types/contact";

// EmailJS API configuration
const SERVICE_ID = "service_udbln6i";
const TEMPLATE_ID = "template_cdlm47w";
const PUBLIC_KEY = "qJB7YggvIAQVgOaiC";
const EMAIL_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Iform>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Create loading state
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const onSubmit: SubmitHandler<Iform> = async (data) => {
    const templateData = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: data,
    };

    try {
      setLoading(true);
      // Sending the form data to EmailJS API
      const response = await axios.post(EMAIL_API_URL, templateData);

      // Handle success response
      if (response.status === 200) {
        toast.success("Message sent!");
        reset();
      }
    } catch (error) {
      toast.error("Submission failed!");
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="relative min-h-screen w-screen bg-gradient-to-b from-secondary to-primary">
      {/* Main container with gradient background */}
      <div className="py-28 flex flex-col items-center gap-20">
        {/* Page title */}
        <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-normal text-light">CONTACT ME</h1>

        <div className="flex flex-col w-full items-center xl:flex-row xl:justify-center xl:gap-20 xl:w-[80%]">
          {/* Left section: Introduction and message */}
          <div className="px-3 w-full max-w-xl xl:px-0 xl:w-1/2 ">
            <CanvasWrapper />
          </div>

          {/* Right section: Contact form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-3 w-full max-w-xl flex flex-col gap-5 items-center text-light xl:px-0 xl:w-1/2"
          >
            {/* Dynamically render input fields from formField array */}
            {formField.map(({ id, label, formType, inputType, placeholder, pattern }, i) => (
              <InputField
                key={`field-${i}`}
                id={id}
                label={label}
                formType={formType}
                inputType={inputType}
                placeholder={placeholder}
                register={register}
                errors={errors}
                pattern={pattern}
              />
            ))}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-md mt-5 text-secondary bg-accent
                         hover:bg-gradient-to-r hover:from-light hover:to-accent
                         hover:shadow-sm hover:shadow-secondary 
                         transition-all duration-500"
            >
              {loading ? "SUBMITING..." : "SUBMIT"}
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </PageContainer>
  );
};

export default Contact;
