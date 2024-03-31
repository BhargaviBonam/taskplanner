import clsx from "clsx";
import React from "react";
import {Text} from 'react-native'

const Title = ({ title, className }) => {
  return (
    <Text className={clsx("text-2xl font-semibold capitalize", className)}>
      {title}
    </Text>
  );
};

export default Title;
