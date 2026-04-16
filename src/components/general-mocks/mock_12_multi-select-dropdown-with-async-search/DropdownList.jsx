import OptionItem from "./OptionItem";

export function DropdownList({data, onSelect}) {

  return (
    <ul style={{border: '1px solid #ccc', marginTop: '4px'}}>
      {data?.map(user => (
        <OptionItem key={user?.id} user={user} onSelect={onSelect} />
        ))}
    </ul>
  );
}