//this was made as part of the burger-builder tutorial but I don't find it useful so I only use it once in burgerBuilder.js
export const updateObject = (oldObj, updatedProperties) => {
  return {
    ...oldObj,
    ...updatedProperties,
  }
}