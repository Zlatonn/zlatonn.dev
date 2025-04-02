export const formField: Array<{
  id: "name" | "email" | "message";
  label: string;
  formType: "input" | "textArea";
  inputType?: string;
  placeholder: string;
  pattern?: RegExp;
}> = [
  {
    id: "name",
    label: "Name",
    formType: "input",
    inputType: "text",
    placeholder: "Enter your name...",
  },
  {
    id: "email",
    label: "Email",
    formType: "input",
    inputType: "text",
    placeholder: "Enter your email...",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  {
    id: "message",
    label: "Message",
    formType: "textArea",
    placeholder: "Enter your message...",
  },
];

export const logos = [
  {
    path: "/models/LinkedIn_Icon.gltf",
    pos: [-2.5, 0, 0],
    link: "https://www.linkedin.com/in/pongsakorn-lengklang",
  },
  {
    path: "/models/Github_Icon.gltf",
    pos: [2.5, 0, 0],
    link: "https://github.com/Zlatonn",
  },
];
