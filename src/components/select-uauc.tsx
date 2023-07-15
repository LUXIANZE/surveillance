import { Select } from "antd"
import { useState } from "react";
import { uaucSearch } from "../rpc/uauc-search";

export const SelectUAUC: React.FC<{ url?: string }> = (props) => {
    const { url } = props
    const [selected, setSelected] = useState<string>()
    const defaultOptions = [
        {
            value: 'ladder',
            label: 'Faulty ladder',
        },
        {
            value: 'phone',
            label: 'Holding phone while walking',
        },
        {
            value: 'waste-bin',
            label: 'Left waste bin in the hallway',
        },
        {
            value: 'fire',
            label: 'Fire',
        },
    ]
    const [options, setOptions] = useState(defaultOptions)

    const onChange = (value: string) => {
        setSelected(value)
    };

    const onSearch = async (value: string) => {
        try {
            if (Boolean(value)) {
                const res = await uaucSearch(value)
                if (res && res.status === 200) {
                    const mappedOptions = (res.data as []).map((raw: any) => ({ value: raw.id, label: raw.rule }));
                    setOptions(mappedOptions)
                }
            } else {
                console.log('url:', url);
                setOptions(defaultOptions)
            }
        } catch (error) {
            console.error(error)
            setOptions(defaultOptions)
        }
    };

    return <Select
        disabled={!url}
        style={{ width: '100%' }}
        showSearch
        value={url && selected}
        placeholder="Please upload a picture then select a UAUC rule"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={false}
        options={options}
    />
}