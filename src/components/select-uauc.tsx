import { Select } from "antd"

export const SelectUAUC: React.FC<{ url?: string }> = (props) => {
    const { url } = props
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
        console.log('url:', url);
    };

    return <Select
        style={{ width: '100%' }}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
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
        ]}
    />
}