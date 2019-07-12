// ! The order of these fields matter. Tests expect that [0] is username, and [1] is password field.
export const textFields_ = Object.freeze([
  { label: "Username", name: "username", type: "text", refKey: "username" },
  { label: "Password", name: "password", type: "password", refKey: "password" }
]);

export const getMockFormProps = (
  textFields = textFields_,
  handleSubmit = event => event.preventDefault(),
  handleReset = () => null
) =>
  Object.freeze({
    textFields,
    handleSubmit,
    handleReset
  });
