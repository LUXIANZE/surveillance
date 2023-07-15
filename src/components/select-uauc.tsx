import { Select } from "antd"
import { useState } from "react";
import { uaucSearch } from "../rpc/uauc-search";

export const SelectUAUC: React.FC<{
    url?: string,
    setSelectedRule: (ruleId: number) => void
}> = (props) => {
    const { url, setSelectedRule } = props
    const [selected, setSelected] = useState<string>()
    const mapRuleToOptions = (rule: { id: number, rule: string }) => ({ value: rule.id, label: rule.rule })
    const defaultOptions = [
        {
            id: 10,
            rule: 'Faulty ladder',
        },
        {
            id: 11,
            rule: 'Holding phone while walking',
        },
        {
            id: 12,
            rule: 'Left waste bin in the hallway',
        },
        {
            id: 13,
            rule: 'Fire',
        },
    ]
    const [options, setOptions] = useState(defaultOptions.map(mapRuleToOptions))

    const onChange = (value: string, option: {
        value: number;
        label: string;
    } | { value: number; label: string; }[]) => {
        setSelected(value)
        if (!Array.isArray(option)) {
            setSelectedRule(option.value)
        }
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
                setOptions(defaultOptions.map(mapRuleToOptions))
            }
        } catch (error) {
            console.error(error)
            setOptions(defaultOptions.map(mapRuleToOptions))
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