import { Search, X } from 'lucide-react-native';

import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';

interface SearchFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

export function SearchField({ value, onChangeText, placeholder }: SearchFieldProps) {
  return (
    <Input className="bg-card">
      <InputSlot className="pl-3">
        <InputIcon as={Search} />
      </InputSlot>
      <InputField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        accessibilityLabel={placeholder}
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 ? (
        <InputSlot
          className="pr-3"
          onPress={() => onChangeText('')}
          accessibilityLabel="Limpar busca"
        >
          <InputIcon as={X} />
        </InputSlot>
      ) : null}
    </Input>
  );
}
