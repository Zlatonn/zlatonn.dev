import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@radix-ui/react-label";

const Contact = () => {
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

          <form className="px-3 max-w-lg flex flex-col gap-5 items-center text-light">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="enter your name..."
                className="bg-light/50 placeholder:text-light border-none outline-none"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="enter your email..."
                className="bg-light/50 placeholder:text-light border-none outline-none"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="enter your message..."
                className="bg-light/50 placeholder:text-light border-none outline-none"
              />
            </div>

            <Button className="w-full mt-5 bg-accent text-secondary hover:bg-accent hover:-translate-y-1 hover:shadow-md hover:shadow-secondary transition-all duration-500">
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
