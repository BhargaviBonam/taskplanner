import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Textbox = React.forwardRef(
  (
    { type, placeholder, label, style, name, error, ...props },
    ref
  ) => {
    return (
      <View style={{ width: '100%', marginBottom: 8 }}>
        {label && (
          <Text style={{ color: '#374151', fontSize: 16, marginBottom: 4 }}>
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 6,
            color: '#1F2937',
            fontSize: 16,
            ...style,
          }}
          {...props}
        />
        {error && (
          <Text style={{ color: '#f64949', fontSize: 12, marginTop: 2 }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

export default Textbox;
