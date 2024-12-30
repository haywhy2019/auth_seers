const handleSelectedProductCheckbox = (
   setSelected: React.Dispatch<React.SetStateAction<number[]>>,
   productId: number,
) => {
   console.log(productId, "cliecked radio")
   setSelected((prev) =>
      prev.includes(productId)
         ? prev.filter((checkboxId) => checkboxId !== productId)
         : [...prev, productId],
   )
}

export default handleSelectedProductCheckbox
