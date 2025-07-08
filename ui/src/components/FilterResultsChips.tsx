import { useSearchContext } from "../contexts/SearchContext";
import { Alias } from "../feature/Chunks/Types/Alias"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export default function FilterResultsToggle() {
  const { chain, aliasesToReturn } = useSearchContext()
  const [returnAliases, setReturnAliases] = useState<Alias[]>(chain.Aliases);
  console.log(`return aliases: ${aliasesToReturn}`)

  const handleChange = (event: any, newAliases: Alias[]) => {
    // newFormats is an array of all selected values
    setReturnAliases(newAliases);
  };

  return (
    <ToggleButtonGroup
      value={returnAliases}
      onChange={handleChange}
      aria-label="return types"
    >
      {returnAliases.map((alias) => {
        return <ToggleButton value="bold" aria-label="bold">
          {alias.Label}
        </ToggleButton>
      })}
    </ToggleButtonGroup>
  );
} 
