import { useForm, SubmitHandler } from "react-hook-form";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

interface Iform {
  name: string;
  email: string;
  message: string;
}

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
  const onSubmit: SubmitHandler<Iform> = (data) => console.log(data);

  return (
    <div className="relative min-h-screen w-screen bg-gradient-to-b from-secondary to-primary">
      <div className="py-28 flex flex-col items-center gap-20">
        <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-regular text-light">CONTACT ME</h1>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-2 xl:gap-20">
          <div className="px-3 max-w-lg xl:max-w-xl flex flex-col gap-3">
            <h2 className="text-accent text-xl">Let's talk 💬</h2>
            <blockquote className="my-3 border-l-2 pl-6 italic text-light lg:text-xl xl:text-2xl">
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae numquam quod vero explicabo ea debitis, exercitationem,
              eos itaque ad unde fugiat, mollitia odit alias tenetur nam non commodi sint! Nobis."
            </blockquote>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-3 max-w-lg flex flex-col gap-5 items-center text-light">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="enter your name..."
                {...register("name", {
                  required: "Name is required.",
                })}
                className="bg-light/50 placeholder:text-light border-none outline-none"
              />
              {errors.name && <p className="w-fit mt-1 text-orange-300 text-sm">{errors.name.message}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="enter your email..."
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format.",
                  },
                })}
                className="bg-light/50 placeholder:text-light border-none outline-none"
              />
              {errors.email && <p className="w-fit mt-1 text-orange-300 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="enter your message..."
                {...register("message", {
                  required: "Message is required.",
                })}
                className="bg-light/50 placeholder:text-light border-none outline-none"
              />
              {errors.message && <p className="w-fit mt-1 text-orange-300 text-sm">{errors.message.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full mt-5 bg-accent text-secondary hover:bg-accent hover:-translate-y-1 hover:shadow-md hover:shadow-secondary transition-all duration-500"
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
