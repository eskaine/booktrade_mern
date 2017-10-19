const InputParams = (name, type) => {
  return {
    id: name.toLowerCase(),
    labelName: name,
    type: type,
    placeholder: name,
    invalidMessage: "Invalid " + name.toLowerCase() + "!"
  };
}

export default InputParams;
