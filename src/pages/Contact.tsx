import { useForm, SubmitHandler } from "react-hook-form";

import PageContainer from "@/components/PageContainer";
import InputField from "@/components/contact/InputField";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import { formField } from "@/contents/ContactContent";

import { Iform } from "@/types/contact";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iform>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<Iform> = (data) => console.log(data);

  return (
    <PageContainer className="relative min-h-screen w-screen bg-gradient-to-b from-secondary to-primary">
      {/* Main container with gradient background */}
      <div className="py-28 flex flex-col items-center gap-20">
        {/* Page title */}
        <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-regular text-light">CONTACT ME</h1>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-2 xl:gap-20">
          {/* Left section: Introduction and message */}
          <div className="px-3 max-w-lg xl:max-w-xl flex flex-col gap-3">
            <h2 className="text-accent text-xl">Let's talk 💬</h2>
            <blockquote className="my-3 border-l-2 pl-6 italic text-light lg:text-xl xl:text-2xl">
              "Feel free to reach out to me! I'm always excited to connect with like-minded individuals, discuss ideas, and explore new
              opportunities. Whether it's a project, collaboration, or just a friendly conversation, I'd love to hear from you."
            </blockquote>
          </div>

          {/* Right section: Contact form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-3 max-w-lg flex flex-col gap-5 items-center text-light">
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
              className="w-full mt-5 bg-accent text-secondary hover:bg-accent 
                         hover:-translate-y-1 hover:shadow-md hover:shadow-secondary 
                         transition-all duration-500"
            >
              SUBMIT
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
