import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import type { LocationIQSuggestion } from "../../../lib/type";
import axios from "axios";

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T>;
export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        }
        else
            setInputValue(field.value || '');
    }, [field.value]);

    const loctionURL = `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&q=tower%20of%20lo&limit=5&dedupe=1&`;

    const fetchSuggestions = useMemo(() => debounce(async (query: string) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get<LocationIQSuggestion[]>(`${loctionURL}q=${query}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
        } finally {
            setLoading(false);
        }
    }, 500), [loctionURL]
    );

    const handleChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    };

    const handleSelect = (suggestion: LocationIQSuggestion) => {
        const city = suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || '';
        const venue = suggestion.display_name;
        const latitude = suggestion.lat;
        const longitude = suggestion.lon;
        setInputValue(venue);
        field.onChange({ city, venue, latitude, longitude });
        setSuggestions([]);
    };

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 &&
                <List sx={{ border: 1 }}>
                    {suggestions.map((suggestion) => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}>
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            }
        </Box>
    )
}