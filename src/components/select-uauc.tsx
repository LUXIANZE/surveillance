import { Select } from "antd"
import { useEffect, useState } from "react";
import { uaucSearch } from "../rpc/uauc-search";
import { suggestUAUC } from "../rpc/suggested-uauc";

interface SuggestionListDTO {
    best_choice: any[],
    suggestion_list: any[]
}

export const SelectUAUC: React.FC<{
    url?: string,
    setSelectedRule: (ruleId: number) => void
}> = (props) => {
    const { url, setSelectedRule } = props
    let suggestedOptions: { value: any, label: string }[] = []
    const [selected, setSelected] = useState<string>()
    const [options, setOptions] = useState<{ value: any, label: string }[]>()

    const mapSuggestionToOption = (rule: { id: number, rule: string }) => ({ value: rule.id, label: rule.rule })

    const presetSelectedAndSuggestion = (list: SuggestionListDTO) => {
        setSelected(list.best_choice[0])
        const tempOptions = list.suggestion_list.map((elem, idx) => {
            return {
                value: idx,
                label: `${elem[0]} [${elem[1]}%]`
            }
        })
        suggestedOptions = tempOptions
        setOptions(tempOptions)
    }

    const onChange = (value: string, option: {
        value: number;
        label: string;
    } | { value: number; label: string; }[]) => {
        setSelected(value)
        if (!Array.isArray(option)) {
            setSelectedRule(option.value)
            setSelected(option.label)
        }
    };

    useEffect(() => {
        (async () => {
            if (url) {
                const res = await suggestUAUC(url)
                console.log(res)
                if (res && res.status === 200) {
                    presetSelectedAndSuggestion(res.data)
                }
            }
        })()
    }, [url])

    const onSearch = async (value: string) => {
        try {
            if (Boolean(value)) {
                const res = await uaucSearch(value)
                if (res && res.status === 200) {
                    const mappedOptions = (res.data as []).map(mapSuggestionToOption);
                    setOptions(mappedOptions)
                }
            } else {
                setOptions(suggestedOptions)
            }
        } catch (error) {
            console.error(error)
            setOptions(suggestedOptions)
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