"use client"

import React, { useState } from "react"

function SelectProductHook() {
   const [selected, setSelected] = useState<number[]>([])

   return { selected, setSelected }
}

export default SelectProductHook
